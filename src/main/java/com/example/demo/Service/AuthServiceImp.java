package com.example.demo.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DTO.Request.CreateUtilisateurRequest;
import com.example.demo.DTO.Request.LoginRequest;
import com.example.demo.DTO.Request.SignupApprenantRequest;
import com.example.demo.DTO.Response.LoginResponse;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Entity.Admin;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.Formateur;
import com.example.demo.Entity.Utilisateur;
import com.example.demo.Enumeration.RoleUtilisateur;
import com.example.demo.Enumeration.statusApprenant;
import com.example.demo.Mapper.UtilisateurMapper;
import com.example.demo.Repository.ApprenantRepository;
import com.example.demo.Repository.UtilisateurRepository;
import com.example.demo.Security.JwtUtil;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthServiceImp implements AuthService {
	private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UtilisateurRepository utilisateurRepository;
    private final ApprenantRepository apprenantRepository;
    private final PasswordEncoder passwordEncoder;
    private final UtilisateurMapper utilisateurMapper;
    

    public AuthServiceImp(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            UtilisateurRepository utilisateurRepository,
            ApprenantRepository apprenantRepository,
            PasswordEncoder passwordEncoder,UtilisateurMapper utilisateurMapper) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.utilisateurRepository = utilisateurRepository;
        this.apprenantRepository = apprenantRepository;
        this.passwordEncoder = passwordEncoder;
        this.utilisateurMapper = utilisateurMapper;
        
    }
    
    @Override
    public LoginResponse login(LoginRequest request) {

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getMotDePasse()
                )
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Email ou mot de passe incorrect");
        } catch (DisabledException e) {
            throw new RuntimeException("Compte désactivé");
        }

        Utilisateur utilisateur = utilisateurRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        String token = jwtUtil.generateToken(
            utilisateur.getEmail(),
            utilisateur.getRole().name()
        );

        return new LoginResponse(
            token,
            utilisateur.getRole().name(),
            utilisateur.getNom(),
            utilisateur.getPrenom(),
            utilisateur.getEmail(),
            utilisateur.getId()
        );
    }

    @Override
    public LoginResponse signupApprenant(SignupApprenantRequest request) {

        if (utilisateurRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }

        Apprenant apprenant = new Apprenant(
            request.getEmail(),
            passwordEncoder.encode(request.getMotDePasse()), // ✅ hash BCrypt
            request.getNom(),
            request.getPrenom(),
            request.getTelephone(),
            genererNumeroEnregistrement()
        );


        apprenant.setStatus(statusApprenant.ACTIF);

        Apprenant saved = apprenantRepository.save(apprenant);

        String token = jwtUtil.generateToken(
            saved.getEmail(),
            RoleUtilisateur.APPRENANT.name()
        );

        return new LoginResponse(
            token,
            RoleUtilisateur.APPRENANT.name(),
            saved.getNom(),
            saved.getPrenom(),
            saved.getEmail(),
            saved.getId()
        );
    }

    @Override
    public LoginResponse getCurrentUser(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new RuntimeException("Token manquant");

        String token = authHeader.substring(7);

        if (!jwtUtil.isTokenValid(token))
            throw new RuntimeException("Token invalide ou expiré");

        String email = jwtUtil.extractEmail(token);
        Utilisateur utilisateur = utilisateurRepository
            .findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Compte introuvable"));

        if (!Boolean.TRUE.equals(utilisateur.getActif()))
            throw new RuntimeException("Compte désactivé");

        return new LoginResponse(
            token,
            utilisateur.getRole().name(),
            utilisateur.getNom(),
            utilisateur.getPrenom(),
            utilisateur.getEmail(),
            utilisateur.getId()
        );
    }

    private Long genererNumeroEnregistrement() {
        long count = apprenantRepository.count() + 1;
        String annee = String.valueOf(LocalDateTime.now().getYear());
        return Long.parseLong(annee + String.format("%03d", count));
    }


}

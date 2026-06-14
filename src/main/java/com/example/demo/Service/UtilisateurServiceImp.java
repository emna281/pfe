package com.example.demo.Service;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DTO.Request.ChangePasswordRequest;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Entity.Admin;
import com.example.demo.Entity.Utilisateur;
import com.example.demo.Enumeration.RoleUtilisateur;
import com.example.demo.Mapper.UtilisateurMapper;
import com.example.demo.Repository.FormateurRepository;
import com.example.demo.Repository.UtilisateurRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UtilisateurServiceImp implements UtilisateurService{
	private UtilisateurRepository utilisateurRepo;
    private PasswordEncoder passwordEncoder;
    private FormateurRepository formateurRepository;
    private UtilisateurMapper utilisateurMapper;
	public UtilisateurServiceImp(UtilisateurRepository utilisateurRepo, PasswordEncoder passwordEncoder,FormateurRepository formateurRepository,UtilisateurMapper utilisateurMapper) {
		super();
		this.utilisateurRepo = utilisateurRepo;
		this.passwordEncoder = passwordEncoder;
		this.formateurRepository= formateurRepository;
		this.utilisateurMapper= utilisateurMapper;
	}
	@Override
	public void creerAdmin(String email, String motDePasse, String nom, String prenom) {
        if (utilisateurRepo.findByEmail(email).isPresent()) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà !");
        }

        Admin admin = new Admin(
            email,
            passwordEncoder.encode(motDePasse), 
            RoleUtilisateur.ADMIN,
            nom,
            prenom
        );

        utilisateurRepo.save(admin);
    }
	
	@Override
    public void changerMotDePasse(String email, ChangePasswordRequest request) {

        Utilisateur user = utilisateurRepo.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));
        
        System.out.println(">>> Email: " + email);
        System.out.println(">>> Ancien MDP saisi: " + request.getAncienMotDePasse());
        System.out.println(">>> Hash en base: " + user.getMotDePasse());
        System.out.println(">>> Matches: " + passwordEncoder.matches(
            request.getAncienMotDePasse(), user.getMotDePasse()));

        if (!passwordEncoder.matches(
                request.getAncienMotDePasse(),
                user.getMotDePasse())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Ancien mot de passe incorrect");
        }

        if (request.getNouveauMotDePasse() == null ||
            request.getNouveauMotDePasse().length() < 8) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Le nouveau mot de passe doit contenir au moins 8 caractères");
        }

        user.setMotDePasse(
            passwordEncoder.encode(request.getNouveauMotDePasse()));
        utilisateurRepo.save(user);
    }
	@Override
	public List<UtilisateurResponse> getFormateursByCompetence(String competence) {
	    return formateurRepository.findByCompetenceAndDisponible(competence)
	        .stream()
	        .map(utilisateurMapper::toResponse)
	        .toList();
	}
}

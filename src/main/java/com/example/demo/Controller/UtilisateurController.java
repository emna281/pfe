package com.example.demo.Controller;

import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.ChangePasswordRequest;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Entity.Utilisateur;
import com.example.demo.Repository.UtilisateurRepository;
import com.example.demo.Service.UtilisateurService;

@RestController
@RequestMapping("/api")
public class UtilisateurController {
	
	private final UtilisateurRepository utilisateurRepository;
	private final UtilisateurService utilisateurService;
	
	public UtilisateurController(UtilisateurRepository utilisateurRepository,UtilisateurService utilisateurService) {
		this.utilisateurRepository = utilisateurRepository;
		this.utilisateurService= utilisateurService;
	}


	@GetMapping("/utilisateurs/me")
	public ResponseEntity<?> getMonProfil(Authentication auth) {
	    String email = auth.getName();
	    Utilisateur user = utilisateurRepository.findByEmail(email)
	        .orElseThrow(() -> new RuntimeException("User not found"));
	    return ResponseEntity.ok(user);
	}
	
	@PutMapping("/user/changer-mot-de-passe")
    public ResponseEntity<?> changerMotDePasse(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {

        String email = authentication.getName(); 
        utilisateurService.changerMotDePasse(email, request);

        return ResponseEntity.ok(
            Map.of("message", "Mot de passe modifié avec succès"));
    }
	@GetMapping("/planificateur/formateurs/par-competence")
	public ResponseEntity<List<UtilisateurResponse>> getFormateursByCompetence(
	        @RequestParam String competence) {
	    return ResponseEntity.ok(utilisateurService.getFormateursByCompetence(competence));
	}

}

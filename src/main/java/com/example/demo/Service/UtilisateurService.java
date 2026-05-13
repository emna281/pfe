package com.example.demo.Service;
import java.util.List;
import com.example.demo.DTO.Request.ChangePasswordRequest;
import com.example.demo.DTO.Response.UtilisateurResponse;

public interface UtilisateurService {
	void creerAdmin(String email, String motDePasse, String nom, String prenom);
	void changerMotDePasse(String email, ChangePasswordRequest request);
	List<UtilisateurResponse> getFormateursByCompetence(String competence);
}

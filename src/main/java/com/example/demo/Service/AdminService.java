package com.example.demo.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.Request.CreateUtilisateurRequest;
import com.example.demo.DTO.Response.PagedResponse;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Enumeration.RoleUtilisateur;

public interface AdminService {
	UtilisateurResponse creerUtilisateur(CreateUtilisateurRequest request);
	List<UtilisateurResponse> getAllUtilisateurs();
	void toggleActif(Long id);
	void supprimerUtilisateur(Long id);
	PagedResponse<UtilisateurResponse> getByFilters(
            RoleUtilisateur role, String search, Boolean actif, int page, int limit);
	
	UtilisateurResponse updateUtilisateur(Long id, CreateUtilisateurRequest request);
	
	String sauvegarderCv(Long userId, MultipartFile file);
	UtilisateurResponse getUtilisateurById(Long id);
}

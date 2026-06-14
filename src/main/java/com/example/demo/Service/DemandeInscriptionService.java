package com.example.demo.Service;

import java.util.List;
import java.util.Map;

import com.example.demo.DTO.Request.DemandeInscriptionRequest;
import com.example.demo.DTO.Response.DemandeInscriptionResponse;
import com.example.demo.Enumeration.ActionDemande;

public interface DemandeInscriptionService {
	DemandeInscriptionResponse createDemande(Long sessionId, DemandeInscriptionRequest request,String authHeader);
	List<DemandeInscriptionResponse> getDemandesByEmail(String email);
	List<DemandeInscriptionResponse> getAllDemandes();
	DemandeInscriptionResponse traiterDemande(Long demandeId, ActionDemande action);
	boolean estConnecte(String authHeader);
    Map<String, Object> estEnregistre(String authHeader, Long sessionId);
}

package com.example.demo.Service;

import java.util.List;


import com.example.demo.DTO.Request.InscriptionRequest;

import com.example.demo.DTO.Response.InscriptionResponseDTO;


public interface InscriptionService {

	InscriptionResponseDTO createInscription(InscriptionRequest request);
    InscriptionResponseDTO getInscriptionById(Long id);

    List<InscriptionResponseDTO> getAllInscriptions();           
    List<InscriptionResponseDTO> getInscriptionsBySession(Long sessionId);     
    List<InscriptionResponseDTO> getInscriptionsByApprenant(Long apprenantId); 

    void deleteInscription(Long id);
    void creerInscriptionsDepuisDemandes(Long sessionId);
    
    List<InscriptionResponseDTO> getInscriptionsNonFacturees();
    
    
}

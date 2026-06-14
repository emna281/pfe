package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.Response.ApprenantAvecCodeDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;
import com.example.demo.DTO.Response.InscriptionResponseDTO;
import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.DTO.Response.UtilisateurResponse;

public interface ApprenantService {
	UtilisateurResponse getMonProfil(String authHeader);
	List<InscriptionResponseDTO> getMesInscriptions(String authHeader);
	List<SessionDTO> getMesSessions(String authHeader);
	List<FactureResponseDTO> getMesFactures(String authHeader);
	void noterInscription(Long inscriptionId, Integer noteFormateur, Integer noteFormation, String authHeader);
	List<ApprenantAvecCodeDTO> getApprenantsAvecCodes();
}

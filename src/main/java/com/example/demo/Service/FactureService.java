package com.example.demo.Service;

import java.math.BigDecimal;
import java.util.List;

import com.example.demo.DTO.Request.FactureRequestDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;
import com.example.demo.Entity.Facture;
import com.example.demo.Enumeration.StatutFacture;

public interface FactureService {
	FactureResponseDTO updateFacture(Long id ,FactureRequestDTO request);
	FactureResponseDTO updateStatut(Long id, StatutFacture nouveauStatut);
	List<FactureResponseDTO> getAllFactures();
	FactureResponseDTO getFactureById(Long id);
	void archiverFacture(Long id);
	List<FactureResponseDTO> getFacturesArchivees() ;
	FactureResponseDTO getFactureByInscription(Long inscriptionId);
	FactureResponseDTO creerFacture(FactureRequestDTO request);
	List<FactureResponseDTO> getFacturesEnRetard();
	List<FactureResponseDTO> getEcheancesProches();
	void relancerFacture(Long id);
	void envoyerAlerte(Long id);
	
}

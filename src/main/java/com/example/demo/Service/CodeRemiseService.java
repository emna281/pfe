package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.Request.CodeRemiseRequestDTO;
import com.example.demo.DTO.Response.CodeRemiseResponseDTO;

public interface CodeRemiseService {
	CodeRemiseResponseDTO creerCode(CodeRemiseRequestDTO request);
	CodeRemiseResponseDTO appliquerCode(Long factureId, String code);
	List<CodeRemiseResponseDTO> getAllCodes();
	public List<CodeRemiseResponseDTO> getCodesByApprenant(Long apprenantId) ;
	void desactiverCode(Long id);
	CodeRemiseResponseDTO validerCode(String code, Long apprenantId);
	
}

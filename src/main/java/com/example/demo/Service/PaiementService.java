package com.example.demo.Service;

import com.example.demo.DTO.Request.PaiementRequestDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;

public interface PaiementService {
	FactureResponseDTO ajouterPaiement(Long factureId, PaiementRequestDTO request);

}

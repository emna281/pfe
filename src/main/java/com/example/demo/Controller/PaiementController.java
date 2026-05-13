package com.example.demo.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.PaiementRequestDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;
import com.example.demo.Service.PaiementService;

@RestController
@RequestMapping("/api/paiements")
public class PaiementController {
	private final PaiementService paiementService;

	public PaiementController(PaiementService paiementService) {
		super();
		this.paiementService = paiementService;
	}
	@PostMapping("/facture/{factureId}")
    public ResponseEntity<FactureResponseDTO> ajouterPaiement(
            @PathVariable Long factureId,
            @RequestBody PaiementRequestDTO request) {
        FactureResponseDTO updatedFacture = paiementService.ajouterPaiement(factureId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedFacture);
    }

}

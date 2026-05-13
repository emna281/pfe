package com.example.demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DTO.Request.DemandeInscriptionRequest;
import com.example.demo.DTO.Response.DemandeInscriptionResponse;
import com.example.demo.Enumeration.ActionDemande;
import com.example.demo.Service.DemandeInscriptionService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class DemandeInscriptionController {
	private final DemandeInscriptionService demandeService;

    public DemandeInscriptionController(DemandeInscriptionService demandeService) {
        this.demandeService = demandeService;
    }

    @PostMapping("/public/sessions/{sessionId}/demandes")
    public ResponseEntity<?> createDemande(
            @PathVariable Long sessionId,
            @Valid @RequestBody DemandeInscriptionRequest request,
            HttpServletRequest httpRequest) {

    	try {
            DemandeInscriptionResponse response = demandeService.createDemande(
                sessionId,
                request,
                httpRequest.getHeader("Authorization")  // ✅ passer le token
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                .body(Map.of("message", e.getReason()));
        }
    }


    @GetMapping("/planificateur/demandes")
    public ResponseEntity<List<DemandeInscriptionResponse>> getAllDemandes() {
        return ResponseEntity.ok(demandeService.getAllDemandes());
    }

    @GetMapping("/planificateur/demandes/email/{email}")
    public ResponseEntity<List<DemandeInscriptionResponse>> getDemandesByEmail(
            @PathVariable String email) {
        return ResponseEntity.ok(demandeService.getDemandesByEmail(email));
    }

    @PutMapping("/planificateur/demandes/{demandeId}/traiter")
    public ResponseEntity<DemandeInscriptionResponse> traiterDemande(
            @PathVariable Long demandeId,
            @RequestParam ActionDemande action) {

        DemandeInscriptionResponse response = demandeService.traiterDemande(demandeId, action);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/public/demandes/est-connecte")
    public ResponseEntity<Map<String, Boolean>> estConnecte(
            HttpServletRequest request) {
        boolean connecte = demandeService.estConnecte(
            request.getHeader("Authorization")
        );
        return ResponseEntity.ok(Map.of("estConnecte", connecte));
    }

    @GetMapping("/public/demandes/est-enregistre")
    public ResponseEntity<Map<String, Object>> estEnregistre(
            @RequestParam Long sessionId,
            HttpServletRequest request) {
        return ResponseEntity.ok(
            demandeService.estEnregistre(
                request.getHeader("Authorization"),
                sessionId
            )
        );
    }

}

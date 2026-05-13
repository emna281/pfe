package com.example.demo.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.InscriptionRequest;
import com.example.demo.DTO.Response.InscriptionResponseDTO;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Session;
import com.example.demo.Mapper.InscriptionMapper;
import com.example.demo.Repository.ApprenantRepository;
import com.example.demo.Repository.SessionRepository;
import com.example.demo.Service.InscriptionService;
import com.example.demo.Service.InscriptionServiceImp;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/planificateur/inscriptions")
public class InscriptionController {

    private final InscriptionService inscriptionService;      
    

    public InscriptionController(InscriptionService inscriptionService) {
        this.inscriptionService = inscriptionService;     
    }

    @PostMapping
    public ResponseEntity<InscriptionResponseDTO> createInscription(
            @Valid @RequestBody InscriptionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(inscriptionService.createInscription(request));
    }

    @GetMapping
    public ResponseEntity<List<InscriptionResponseDTO>> getAllInscriptions() {
        return ResponseEntity.ok(inscriptionService.getAllInscriptions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscriptionResponseDTO> getInscriptionById(
            @PathVariable Long id) {
        return ResponseEntity.ok(inscriptionService.getInscriptionById(id));
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<InscriptionResponseDTO>> getBySession(
            @PathVariable Long sessionId) {
        return ResponseEntity.ok(
            inscriptionService.getInscriptionsBySession(sessionId));
    }
    
    @GetMapping("/apprenant/{apprenantId}")
    public ResponseEntity<List<InscriptionResponseDTO>> getByApprenant(
            @PathVariable Long apprenantId) {
        return ResponseEntity.ok(
            inscriptionService.getInscriptionsByApprenant(apprenantId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInscription(@PathVariable Long id) {
        inscriptionService.deleteInscription(id);
        return ResponseEntity.noContent().build();
    }
    
    
}

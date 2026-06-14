package com.example.demo.Controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.NoteInscriptionRequest;
import com.example.demo.DTO.Response.ApprenantAvecCodeDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;
import com.example.demo.DTO.Response.InscriptionResponseDTO;
import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Service.ApprenantService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/apprenant")
@PreAuthorize("hasRole('APPRENANT')")
public class ApprenantController {

    private final ApprenantService apprenantService;

    public ApprenantController(ApprenantService apprenantService) {
        this.apprenantService = apprenantService;
    }

    @GetMapping("/me")
    public ResponseEntity<UtilisateurResponse> getMonProfil(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(apprenantService.getMonProfil(authHeader));
    }
    @GetMapping("/mes-inscriptions")
    public ResponseEntity<List<InscriptionResponseDTO>> getMesInscriptions(
            HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(apprenantService.getMesInscriptions(authHeader));
    }
    @GetMapping("/mes-sessions")
    public ResponseEntity<List<SessionDTO>> getMesSessions(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(apprenantService.getMesSessions(authHeader));
    }
    @GetMapping("/mes-factures")
    public ResponseEntity<List<FactureResponseDTO>> getMesFactures(HttpServletRequest request) {
        return ResponseEntity.ok(apprenantService.getMesFactures(request.getHeader("Authorization")));
    }

    @PutMapping("/inscriptions/{inscriptionId}/noter")
    public ResponseEntity<Void> noterInscription(
            @PathVariable Long inscriptionId,
            @RequestBody NoteInscriptionRequest request,
            HttpServletRequest httpRequest) {
        apprenantService.noterInscription(
            inscriptionId,
            request.getNoteFormateur(),
            request.getNoteFormation(),
            httpRequest.getHeader("Authorization")
        );
        return ResponseEntity.ok().build();
    }

}

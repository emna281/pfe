package com.example.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.DTO.Response.TableauPresenceResponseDTO;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Service.FormateurService;
import com.example.demo.Service.PresenceService;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/formateur")
@PreAuthorize("hasRole('FORMATEUR')")
public class FormateurController {
    private final FormateurService formateurService;
    private final PresenceService presenceService;
    public FormateurController(FormateurService formateurService,PresenceService presenceService) {
        this.formateurService = formateurService;
        this.presenceService=presenceService;
    }

    @GetMapping("/me")
    public ResponseEntity<UtilisateurResponse> getMonProfil(HttpServletRequest request) {
        return ResponseEntity.ok(
            formateurService.getMonProfil(request.getHeader("Authorization"))
        );
    }

    @GetMapping("/mes-sessions")
    public ResponseEntity<List<SessionDTO>> getMesSessions(HttpServletRequest request) {
        return ResponseEntity.ok(
            formateurService.getMesSessions(request.getHeader("Authorization"))
        );
    }
    @PostMapping("/presences/session/{sessionId}/initialiser")
    public ResponseEntity<Map<String, Object>> initialiserPresences(
            @PathVariable Long sessionId) {
        return ResponseEntity.ok(
            presenceService.initialiserPresencesSession(sessionId)
        );
    }

    @GetMapping("/presences/session/{sessionId}/tableau")
    public ResponseEntity<TableauPresenceResponseDTO> getTableauPresences(
            @PathVariable Long sessionId) {
        return ResponseEntity.ok(
            presenceService.getTableauPresence(sessionId)
        );
    }
}

package com.example.demo.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.PresenceRequestDTO;
import com.example.demo.DTO.Response.PresenceResponseDTO;
import com.example.demo.DTO.Response.TableauPresenceResponseDTO;
import com.example.demo.Service.PresenceService;

@RestController
@RequestMapping("/api")
public class PresenceController {
	private final PresenceService presenceService;

	public PresenceController(PresenceService presenceService) {
		super();
		this.presenceService = presenceService;
	}
	
	@PostMapping("/planificateur/presences/session/{sessionId}/initialiser")
    public ResponseEntity<Map<String, Object>> initialiser(
            @PathVariable Long sessionId) {
        return ResponseEntity.ok(
            presenceService.initialiserPresencesSession(sessionId)
        );
    }


    @PutMapping("/presences/marquer")
    public ResponseEntity<PresenceResponseDTO> marquer(
            @RequestBody PresenceRequestDTO dto) {
        return ResponseEntity.ok(presenceService.marquerPresence(dto));
    }


    @GetMapping("/planificateur/presences/session/{sessionId}/tableau")
    public ResponseEntity<TableauPresenceResponseDTO> getTableau(
            @PathVariable Long sessionId) {
        return ResponseEntity.ok(presenceService.getTableauPresence(sessionId));
    }
}

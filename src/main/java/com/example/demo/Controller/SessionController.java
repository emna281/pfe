package com.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.FormationRequest;
import com.example.demo.DTO.Request.SessionRequest;
import com.example.demo.DTO.Response.FormationAdminDTO;
import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.Service.SessionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class SessionController {
	private final SessionService sessionService ;

	public SessionController(SessionService sessionService) {
		super();
		this.sessionService = sessionService;
	}
	
	@PostMapping("/planificateur/sessions")
	public ResponseEntity<SessionDTO> createSession(
	        @Valid @RequestBody SessionRequest request) {

	    SessionDTO created = sessionService.createSession(request);
	    return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}
	@GetMapping("/public/sessions/{id}")
	public ResponseEntity<SessionDTO> getSessionById(@PathVariable Long id) {
		SessionDTO session = sessionService.getSessionById(id);
        return ResponseEntity.ok(session);
	}

    @GetMapping("/public/sessions/code/{code}")
    public ResponseEntity<SessionDTO> getSessionByCode(@PathVariable String code) {
    	SessionDTO session = sessionService.getSessionByCode(code);
    	return ResponseEntity.ok(session);
           
    }
    @GetMapping("/public/sessions")
    public ResponseEntity<List<SessionDTO>> getAllSessions() {
        List<SessionDTO> sessions = sessionService.getAllSessions();
        return ResponseEntity.ok(sessions);
    }
    /*@GetMapping
    public ResponseEntity<List<SessionDTO>> getArchiveSessions() {
        List<FormationAdminDTO> formations = sessionService.getArchiveSessions();
        return ResponseEntity.ok(formations);
    }*/

    /*@GetMapping("/search")
    public ResponseEntity<List<SessionDTO>> searchSessions(
            @RequestParam String keyword) {
        List<SessionDTO> sessions = sessionService.searchSessionsByTitle(keyword);
        return ResponseEntity.ok(sessions);
    }*/

    @PutMapping("/planificateur/sessions/{id}")
    public ResponseEntity<SessionDTO> updateSession(
            @PathVariable Long id,
            @Valid @RequestBody SessionRequest request) {
        
    	SessionDTO updated = sessionService.updateSession(id, request);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/planificateur/sessions/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {

        sessionService.deleteSession(id);
        return ResponseEntity.noContent().build();
    }
    
    @PatchMapping("/planificateur/sessions/{sessionId}/confirmer")
    public ResponseEntity<SessionDTO> confirmerSession(
            @PathVariable Long sessionId) {
        SessionDTO response = sessionService.confirmerSession(sessionId);
        return ResponseEntity.ok(response);
    }
  
    @PatchMapping("/planificateur/sessions/{sessionId}/ouvrir")
    public ResponseEntity<SessionDTO> ouvrirSession(
            @PathVariable Long sessionId) {
        return ResponseEntity.ok(sessionService.ouvrirSession(sessionId));
    }

}

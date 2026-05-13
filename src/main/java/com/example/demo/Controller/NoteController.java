package com.example.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.noteRequest;
import com.example.demo.DTO.Response.noteResponse;
import com.example.demo.Service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
	private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/session/{sessionId}/initialiser")
    public ResponseEntity<List<noteResponse>> initialiser(@PathVariable Long sessionId) {
        return ResponseEntity.ok(noteService.initialiserNotesSession(sessionId));
    }

    @PostMapping("/session/{sessionId}")
    public ResponseEntity<noteResponse> ajouterNote(
            @PathVariable Long sessionId,
            @RequestBody noteRequest request) {
        return ResponseEntity.ok(noteService.ajouterNote(sessionId, request));
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<noteResponse>> getTableau(@PathVariable Long sessionId) {
        return ResponseEntity.ok(noteService.getTableauNotes(sessionId));
    }

}

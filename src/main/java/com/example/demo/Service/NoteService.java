package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.Request.noteRequest;
import com.example.demo.DTO.Response.noteResponse;

public interface NoteService {
	List<noteResponse> initialiserNotesSession(Long sessionId);
	noteResponse ajouterNote(Long sessionId, noteRequest request);
	List<noteResponse> getTableauNotes(Long sessionId);

}

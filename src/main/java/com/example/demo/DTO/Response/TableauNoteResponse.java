package com.example.demo.DTO.Response;

import java.util.List;

import com.example.demo.DTO.Request.noteRequest;

public class TableauNoteResponse {
	private Long sessionId;
    private List<noteRequest> notes;

    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
    public List<noteRequest> getNotes() { return notes; }
    public void setNotes(List<noteRequest> notes) { this.notes = notes; }

}

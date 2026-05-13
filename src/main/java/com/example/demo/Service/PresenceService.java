package com.example.demo.Service;

import java.util.Map;

import com.example.demo.DTO.Request.PresenceRequestDTO;
import com.example.demo.DTO.Response.PresenceResponseDTO;
import com.example.demo.DTO.Response.TableauPresenceResponseDTO;

public interface PresenceService {
	Map<String, Object> initialiserPresencesSession(Long sessionId);
	PresenceResponseDTO marquerPresence(PresenceRequestDTO dto);
	TableauPresenceResponseDTO getTableauPresence(Long sessionId);
}

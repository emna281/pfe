package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.Request.CompetenceRequest;
import com.example.demo.DTO.Request.SessionRequest;
import com.example.demo.DTO.Response.CompetenceInfoDTO;
import com.example.demo.DTO.Response.SessionDTO;

public interface SessionService {
	SessionDTO createSession(SessionRequest requestDTO);
    
	SessionDTO updateSession(Long id, SessionRequest requestDTO);
    
    void deleteSession(Long id);
    
    SessionDTO getSessionById(Long id);
    
    SessionDTO getSessionByCode(String code);
    
    
    
    List<SessionDTO> getAllSessions();
    SessionDTO confirmerSession(Long sessionId);
    SessionDTO ouvrirSession(Long sessionId);

}

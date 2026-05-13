package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.DTO.Response.UtilisateurResponse;

public interface FormateurService {
	UtilisateurResponse getMonProfil(String authHeader);
    List<SessionDTO> getMesSessions(String authHeader);

}

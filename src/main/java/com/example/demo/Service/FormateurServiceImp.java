package com.example.demo.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Entity.Formateur;
import com.example.demo.Mapper.SessionMapper;
import com.example.demo.Mapper.UtilisateurMapper;
import com.example.demo.Repository.FormateurRepository;
import com.example.demo.Security.JwtUtil;
import java.util.List;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;

@Service
@Transactional
public class FormateurServiceImp implements FormateurService{
	private final FormateurRepository formateurRepository;
    private final UtilisateurMapper utilisateurMapper;
    private final SessionMapper sessionMapper;
    private final JwtUtil jwtUtil;
	public FormateurServiceImp(FormateurRepository formateurRepository, UtilisateurMapper utilisateurMapper,
			SessionMapper sessionMapper, JwtUtil jwtUtil) {
		super();
		this.formateurRepository = formateurRepository;
		this.utilisateurMapper = utilisateurMapper;
		this.sessionMapper = sessionMapper;
		this.jwtUtil = jwtUtil;
	}
	
	private Formateur getFormateurFromToken(String authHeader) {
        String email = jwtUtil.extractEmail(authHeader.replace("Bearer ", ""));
        return formateurRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Formateur introuvable"));
    }
	
	@Override
    public UtilisateurResponse getMonProfil(String authHeader) {
        Formateur formateur = getFormateurFromToken(authHeader);
        return utilisateurMapper.toFormateurResponse(formateur);
    }

    @Override
    public List<SessionDTO> getMesSessions(String authHeader) {
        Formateur formateur = getFormateurFromToken(authHeader);
        return formateur.getSessions()
            .stream()
            .filter(s -> !s.isArchive())
            .map(sessionMapper::toDTO)
            .toList();
    }

}

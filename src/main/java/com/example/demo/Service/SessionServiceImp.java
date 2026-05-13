package com.example.demo.Service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DTO.Request.CompetenceRequest;
import com.example.demo.DTO.Request.SessionRequest;
import com.example.demo.DTO.Response.CompetenceInfoDTO;
import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.Entity.Competence;
import com.example.demo.Entity.Formateur;
import com.example.demo.Entity.Formation;
import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.StatutSession;
import com.example.demo.Mapper.SessionMapper;
import com.example.demo.Repository.FormateurRepository;
import com.example.demo.Repository.FormationRepository;
import com.example.demo.Repository.InscriptionRepository;
import com.example.demo.Repository.SessionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SessionServiceImp implements SessionService{
	private final SessionRepository  sessionRepository;
	private final SessionMapper sessionMapper;
	private final FormationRepository formationRepository;
	private final InscriptionRepository  inscriptionRepository;
	private final InscriptionService inscriptionService;
	private final FormateurRepository formateurRepository;
	public SessionServiceImp(SessionRepository sessionRepository, SessionMapper sessionMapper,
			FormationRepository formationRepository,InscriptionRepository  inscriptionRepository,InscriptionService inscriptionService,FormateurRepository formateurRepository) {
		super();
		this.sessionRepository = sessionRepository;
		this.formationRepository = formationRepository;
		this.sessionMapper = sessionMapper;
		this.inscriptionRepository= inscriptionRepository;
		this.inscriptionService=  inscriptionService ;
		this.formateurRepository= formateurRepository;
	}
	
	@Override
	public SessionDTO createSession(SessionRequest requestDTO) {
	    if (requestDTO.getDateFin().isBefore(requestDTO.getDateDebut())) {
	        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
	            "La date de fin doit être après la date de début");
	    }
	    

	    Session session = sessionMapper.toEntity(requestDTO);
	    if (requestDTO.getFormateurId() != null) {
	        Formateur formateur = formateurRepository.findById(requestDTO.getFormateurId())
	            .orElseThrow(() -> new ResponseStatusException(
	                HttpStatus.NOT_FOUND, "Formateur introuvable"));
	        session.setFormateur(formateur);
	    }
	   
	    Formation formation = formationRepository.findByCode(requestDTO.getFormationCode())
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
	                    "Formation introuvable"));
	    session.setFormation(formation);
	    Double prixFormation= formation.getPrixPublic();
	    session.setPrix(BigDecimal.valueOf(prixFormation));
	    Session saved = sessionRepository.save(session);

	    return sessionMapper.toDTO(saved);
	}
	@Override
	public SessionDTO updateSession(Long id, SessionRequest requestDTO) {

	    Session existing = sessionRepository.findById(id)
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Session non trouvée avec l'ID: " + id));
	   
	    if (requestDTO.getDateFin().isBefore(requestDTO.getDateDebut())) {
	        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"La date de fin doit être après la date de début");
	    }
	    if (requestDTO.getFormateurId() != null) {
	        Formateur formateur = formateurRepository.findById(requestDTO.getFormateurId())
	            .orElseThrow(() -> new ResponseStatusException(
	                HttpStatus.NOT_FOUND, "Formateur introuvable"));
	        existing.setFormateur(formateur);
	    }
	    sessionMapper.updateEntity(existing, requestDTO);

	    Formation formation = formationRepository
	            .findByCode(requestDTO.getFormationCode())
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Formation introuvable"));

	    existing.setFormation(formation);

	    Session updated = sessionRepository.save(existing);

	    return sessionMapper.toDTO(updated);
	}
	@Override
	public void deleteSession(Long id) {

	    Session session = sessionRepository.findById(id)
	            .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.NOT_FOUND,
	                    "Session non trouvée"));

	    session.setArchive(true);
	    sessionRepository.save(session);
	}
	@Override
	public SessionDTO getSessionById(Long id) {
		Session session = sessionRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException( HttpStatus.NOT_FOUND,"Session non trouvée avec l'ID: " + id));
	        
	        return sessionMapper.toDTO(session);
	}
	@Override
	public SessionDTO getSessionByCode(String code) {
		Session session = sessionRepository.findByCode(code)
	            .orElseThrow(() -> new ResponseStatusException( HttpStatus.NOT_FOUND,"Session non trouvée avec l'CODE: " + code));
	        
	        return sessionMapper.toDTO(session);
	}
	@Override
	public List<SessionDTO> getAllSessions(){
		List<Session> sessions = sessionRepository.findByArchiveFalse();
        return sessionMapper.toSessionDTOList(sessions);
		
	}
	@Override
	public SessionDTO confirmerSession(Long sessionId) {
		Session session = sessionRepository.findById(sessionId)
				.orElseThrow(() -> new ResponseStatusException(
			            HttpStatus.NOT_FOUND, "Session non trouvée"));

	        if (session.getStatut() != StatutSession.OUVERTE) {
	        	throw new ResponseStatusException(
	                    HttpStatus.BAD_REQUEST, "Session ne peut pas être confirmée");
	        }

	        session.setStatut(StatutSession.CONFIRMEE);
	        sessionRepository.save(session);
	        inscriptionService.creerInscriptionsDepuisDemandes(sessionId);

	        return sessionMapper.toDTO(session);
		
	}
	@Override
	public SessionDTO ouvrirSession(Long sessionId) {
	    Session session = sessionRepository.findById(sessionId)
	        .orElseThrow(() -> new ResponseStatusException(
	            HttpStatus.NOT_FOUND, "Session non trouvée"));

	    if (session.getStatut() != StatutSession.PLANIFIEE) {
	        throw new ResponseStatusException(
	            HttpStatus.BAD_REQUEST, "Session ne peut pas être ouverte");
	    }

	    session.setStatut(StatutSession.OUVERTE);
	    sessionRepository.save(session);
	    return sessionMapper.toDTO(session);
	}
	

}

package com.example.demo.Service;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DTO.Request.DemandeInscriptionRequest;
import com.example.demo.DTO.Request.FactureRequestDTO;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.DemandeInscription;
import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Session;
import com.example.demo.Entity.Utilisateur;
import com.example.demo.Enumeration.ActionDemande;
import com.example.demo.Enumeration.RoleUtilisateur;
import com.example.demo.Enumeration.StatutDemande;
import com.example.demo.Enumeration.StatutInscription;
import com.example.demo.Enumeration.StatutSession;
import com.example.demo.Enumeration.StatutUtilisateur;
import com.example.demo.Enumeration.statusApprenant;
import com.example.demo.Mapper.DemandeInscriptionMapper;
import com.example.demo.Repository.ApprenantRepository;
import com.example.demo.Repository.DemandeInscriptionRepository;
import com.example.demo.Repository.InscriptionRepository;
import com.example.demo.Repository.SessionRepository;
import com.example.demo.Repository.UtilisateurRepository;
import com.example.demo.Security.JwtUtil;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.example.demo.DTO.Response.DemandeInscriptionResponse;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DemandeInscriptionServiceImp implements DemandeInscriptionService{
	private final SessionRepository sessionRepository ;
	private final DemandeInscriptionRepository demandeRepository;
	private final DemandeInscriptionMapper demandeInscriptionMapper;
	private final InscriptionRepository  inscriptionRepository;
	private final UtilisateurRepository utilisateurRepository;
	private final ApprenantRepository apprenantRepository;
	private final PasswordEncoder passwordEncoder;
	private final PresenceService presenceService;
	private final JwtUtil jwtUtil;
	private final FactureService factureService;

	
	public DemandeInscriptionServiceImp(SessionRepository sessionRepository,DemandeInscriptionRepository demandeRepository,
			DemandeInscriptionMapper demandeInscriptionMapper,InscriptionRepository  inscriptionRepository,
			UtilisateurRepository utilisateurRepository,ApprenantRepository apprenantRepository,
			PasswordEncoder passwordEncoder,JwtUtil jwtUtil,PresenceService presenceService,
			@Lazy FactureService factureService) {
		super();
		this.sessionRepository = sessionRepository;
		this.demandeRepository= demandeRepository;
		this.demandeInscriptionMapper= demandeInscriptionMapper;
		this.inscriptionRepository=inscriptionRepository;
		this.utilisateurRepository=utilisateurRepository;
		this.apprenantRepository=apprenantRepository;
		this.passwordEncoder=passwordEncoder;
		this.jwtUtil = jwtUtil;
		this.presenceService= presenceService;
		this.factureService=factureService;
	}

	@Override
	public DemandeInscriptionResponse createDemande(Long sessionId, DemandeInscriptionRequest request,String authHeader) {

		if (!estConnecte(authHeader)) {
	        throw new ResponseStatusException(
	            HttpStatus.UNAUTHORIZED,
	            "Vous devez être connecté pour soumettre une demande"
	        );
	    }
	    Map<String, Object> verification = estEnregistre(authHeader, sessionId);
	    if (Boolean.TRUE.equals(verification.get("dejaInscrit"))) {
	        throw new ResponseStatusException(
	            HttpStatus.CONFLICT,
	            "Vous êtes déjà inscrit à cette session"
	        );
	    }

	    if (Boolean.TRUE.equals(verification.get("demandeExistante"))) {
	        throw new ResponseStatusException(
	            HttpStatus.CONFLICT,
	            "Vous avez déjà soumis une demande pour cette session"
	        );
	    }
	    
		Session session = sessionRepository.findById(sessionId)
	            .orElseThrow(() -> new RuntimeException("Session non trouvée"));

	    
	    if (session.getStatut() != StatutSession.OUVERTE) {
	        throw new RuntimeException("Session non disponible");
	    }
	    DemandeInscription demande = demandeInscriptionMapper.toEntity(request);
	    demande.setSession(session);
	    DemandeInscription saved = demandeRepository.save(demande);

	    return demandeInscriptionMapper.toDTO(saved);
	}
	@Override
	public List<DemandeInscriptionResponse> getAllDemandes() {
	    return demandeInscriptionMapper.toDTOList(demandeRepository.findAll());
	}
	@Override
	public List<DemandeInscriptionResponse> getDemandesByEmail(String email) {
	    return demandeInscriptionMapper.toDTOList(
	        demandeRepository.findByEmail(email)
	    );
	}
	
	@Override
	public DemandeInscriptionResponse traiterDemande(Long demandeId, ActionDemande action) {
		DemandeInscription demande = demandeRepository.findById(demandeId)
	            .orElseThrow(() -> new RuntimeException("Demande non trouvée"));

	    if (demande.getStatut() != StatutDemande.EN_ATTENTE) {
	        throw new RuntimeException("Demande déjà traitée");
	    }

	    switch (action) {
	        case ACCEPTER:
	            demande.setStatut(StatutDemande.VALIDEE);
	            
	            Session session = demande.getSession();
	            if (session.getPlacesRestantes() <= 0) {
	                throw new RuntimeException("Plus de places disponibles");
	            }
	            Apprenant apprenant = apprenantRepository
	                    .findByEmail(demande.getEmail())
	                    .orElseThrow(() -> new RuntimeException("Apprenant introuvable"));
	            
	            apprenant.setPosteActuel(demande.getPosteActuel());
	            apprenant.setNiveauEtude(demande.getNiveauDeclare());
	            apprenantRepository.save(apprenant);
	            
	            Inscription inscription = new Inscription();
	            inscription.setApprenant(apprenant);
	            inscription.setSession(session);
	            inscription.setStatut(StatutInscription.CONFIRMEE);
	            inscription.setFacturee(false); 
	            inscription.setDateInscription(LocalDateTime.now());
	            Inscription savedInscription = inscriptionRepository.save(inscription); 
	            demande.setInscription(savedInscription);
	            demande.setApprenant(apprenant);
	            
	            FactureRequestDTO factureRequest = new FactureRequestDTO();
	            factureRequest.setInscriptionId(savedInscription.getId());
	            factureRequest.setDateEcheance(LocalDate.now().plusDays(30));
	            factureService.creerFacture(factureRequest);
	            
	            session.setPlacesRestantes(session.getPlacesRestantes() - 1);
	            sessionRepository.save(session);
	            try {
	                presenceService.initialiserPresencesSession(session.getId());
	            } catch (IllegalStateException e) {
	            }
	            break;

	        case REFUSER:
	            demande.setStatut(StatutDemande.REFUSEE);
	            
	            break;

	        default:
	            throw new RuntimeException("Action inconnue");
	    }

	    DemandeInscription updated = demandeRepository.save(demande);
	    return demandeInscriptionMapper.toDTO(updated);
	}
	
	private String genererMotDePasse() {
	    String caracteres = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
	    StringBuilder mdp = new StringBuilder();
	    Random random = new Random();
	    for (int i = 0; i < 8; i++) {
	        mdp.append(caracteres.charAt(random.nextInt(caracteres.length())));
	    }
	    return mdp.toString();
	}


	private Long genererNumeroEnregistrement() {
	    // ex: 2026001, 2026002...
	    long count = apprenantRepository.count() + 1;
	    String annee = String.valueOf(LocalDateTime.now().getYear());
	    return Long.parseLong(annee + String.format("%03d", count));
	}
	@Override
	public boolean estConnecte(String authHeader) {
	    if (authHeader == null || !authHeader.startsWith("Bearer "))
	        return false;

	    String token = authHeader.substring(7);

	    if (!jwtUtil.isTokenValid(token))
	        return false;

	    String email = jwtUtil.extractEmail(token);

	    return utilisateurRepository.findByEmail(email)
	        .map(u -> Boolean.TRUE.equals(u.getActif()))
	        .orElse(false);
	}
	@Override
	public Map<String, Object> estEnregistre(String authHeader, Long sessionId) {
	    Map<String, Object> result = new HashMap<>();

	    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	        result.put("estEnregistre", false);
	        result.put("message", "Non connecté");
	        return result;
	    }

	    String email = jwtUtil.extractEmail(authHeader.substring(7));

	    boolean demandeExistante = demandeRepository
	        .existsByEmailAndSessionId(email, sessionId);

	    boolean dejaInscrit = inscriptionRepository
	        .existsByApprenantEmailAndSessionId(email, sessionId);

	    result.put("estEnregistre", demandeExistante || dejaInscrit);
	    result.put("demandeExistante", demandeExistante);
	    result.put("dejaInscrit", dejaInscrit);
	    result.put("email", email);

	    return result;
	}
}

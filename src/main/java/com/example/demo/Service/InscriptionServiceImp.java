package com.example.demo.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus; 
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DTO.Request.FactureRequestDTO;
import com.example.demo.DTO.Request.InscriptionRequest;

import com.example.demo.DTO.Response.InscriptionResponseDTO;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.DemandeInscription;
import com.example.demo.Entity.Facture;
import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.RoleUtilisateur;
import com.example.demo.Enumeration.StatutDemande;
import com.example.demo.Enumeration.StatutFacture;

import com.example.demo.Enumeration.StatutSession;
import com.example.demo.Enumeration.statusApprenant;
import com.example.demo.Mapper.InscriptionMapper;
import com.example.demo.Repository.ApprenantRepository;
import com.example.demo.Repository.DemandeInscriptionRepository;
import com.example.demo.Repository.FactureRepository;
import com.example.demo.Repository.InscriptionRepository;
import com.example.demo.Repository.SessionRepository;


import jakarta.transaction.Transactional;


@Transactional
@Service
public class InscriptionServiceImp implements InscriptionService {

    private final InscriptionRepository inscriptionRepository;
    private final ApprenantRepository apprenantRepository;
    private final SessionRepository sessionRepository;
    private final FactureRepository factureRepository;
    private final DemandeInscriptionRepository demandeInscriptionRepository;
    private final InscriptionMapper inscriptionMapper;
    private final PresenceService presenceService;
    private final FactureService factureService;
    private static final Logger logger = 
        LoggerFactory.getLogger(InscriptionServiceImp.class);

    public InscriptionServiceImp(
            InscriptionRepository inscriptionRepository,
            ApprenantRepository apprenantRepository,
            SessionRepository sessionRepository,
            FactureRepository factureRepository,
            DemandeInscriptionRepository demandeInscriptionRepository,
            InscriptionMapper inscriptionMapper,PresenceService presenceService,
            @Lazy FactureService factureService) {
        this.inscriptionRepository = inscriptionRepository;
        this.apprenantRepository = apprenantRepository;
        this.sessionRepository = sessionRepository;
        this.factureRepository = factureRepository;
        this.demandeInscriptionRepository = demandeInscriptionRepository;
        this.inscriptionMapper = inscriptionMapper;
        this.presenceService= presenceService;
        this.factureService=factureService;
    }
    
    @Override
    public List<InscriptionResponseDTO> getAllInscriptions() {
        return inscriptionMapper.toDTOList(inscriptionRepository.findAll());
    }
    @Override
    public InscriptionResponseDTO getInscriptionById(Long id) {
        Inscription inscription = inscriptionRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(  // ✅ maintenant importé
                HttpStatus.NOT_FOUND,
                "Inscription non trouvée avec l'ID: " + id));
        return inscriptionMapper.toDTO(inscription);
    }

    @Override
    public List<InscriptionResponseDTO> getInscriptionsBySession(Long sessionId) {
        sessionRepository.findById(sessionId)
            .orElseThrow(() -> new ResponseStatusException( 
                HttpStatus.NOT_FOUND,
                "Session non trouvée avec l'ID: " + sessionId));

        return inscriptionMapper.toDTOList(
            inscriptionRepository.findBySessionId(sessionId));
    }
    
    
    @Override
    public List<InscriptionResponseDTO> getInscriptionsByApprenant(Long apprenantId) {
        apprenantRepository.findById(apprenantId)
            .orElseThrow(() -> new ResponseStatusException( 
                HttpStatus.NOT_FOUND,
                "Apprenant non trouvé avec l'ID: " + apprenantId));

        return inscriptionMapper.toDTOList(
            inscriptionRepository.findByApprenantId(apprenantId));
    }
    
    @Override
    public List<InscriptionResponseDTO> getInscriptionsNonFacturees() {
        return inscriptionMapper.toDTOList(
            inscriptionRepository.findByFacturee(false)
        );
    }
    
    @Override
    public void deleteInscription(Long id) {
        Inscription inscription = inscriptionRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Inscription non trouvée avec l'ID: " + id));

        // Remettre la place dans la session
        Session session = inscription.getSession();
        session.setPlacesRestantes(session.getPlacesRestantes() + 1);
        sessionRepository.save(session);

        logger.info("Inscription supprimée avec ID: {}", id);
        inscriptionRepository.delete(inscription);
    }
    @Override
    public InscriptionResponseDTO createInscription(InscriptionRequest request) {

        Apprenant apprenant = apprenantRepository
            .findById(request.getApprenantId())
            .orElseThrow(() -> new RuntimeException(
                "Apprenant non trouvé avec l'ID: " + request.getApprenantId()));

        Session session = sessionRepository
            .findById(request.getSessionId())
            .orElseThrow(() -> new RuntimeException(
                "Session non trouvée avec l'ID: " + request.getSessionId()));

        Inscription saved = creerEtSauvegarderInscription(apprenant, session);
        return inscriptionMapper.toDTO(saved);
    }

    private Inscription creerEtSauvegarderInscription(
            Apprenant apprenant, Session session) {

        logger.info("Tentative d'inscription - Apprenant: {}, Session: {}",
            apprenant.getId(), session.getId());

        if (session.isArchive()) {
            throw new RuntimeException(
                "Impossible de s'inscrire à une session archivée");
        }

        if (session.getStatut() == StatutSession.TERMINEE) {
            throw new RuntimeException(
                "Impossible de s'inscrire à une session terminée");
        }

        if (session.getPlacesRestantes() <= 0) {
            throw new RuntimeException("La session est complète");
        }

        boolean dejaInscrit = inscriptionRepository
            .existsByApprenantIdAndSessionId(
                apprenant.getId(), session.getId());

        if (dejaInscrit) {
            throw new RuntimeException(
                "L'apprenant " + apprenant.getPrenom() + 
                " " + apprenant.getNom() + 
                " est déjà inscrit à la session '" + session.getNom() + "'");
        }

        Inscription inscription = new Inscription();
        inscription.setApprenant(apprenant);
        inscription.setSession(session);
        inscription.setFacturee(false);  
        Inscription saved = inscriptionRepository.save(inscription);

        logger.info("Inscription sauvegardée avec ID: {}", saved.getId());

        session.setPlacesRestantes(session.getPlacesRestantes() - 1);
        sessionRepository.save(session);
        
        FactureRequestDTO factureRequest = new FactureRequestDTO();
        factureRequest.setInscriptionId(saved.getId());
        factureRequest.setDateEcheance(LocalDate.now().plusDays(30));
        factureService.creerFacture(factureRequest);

        try {
            presenceService.initialiserPresencesSession(session.getId());
        } catch (IllegalStateException e) {
        }

        return saved;
    }
    @Override
    public void creerInscriptionsDepuisDemandes(Long sessionId) {

        Session session = sessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session non trouvée"));

        List<DemandeInscription> demandesValidees = demandeInscriptionRepository
            .findBySessionIdAndStatut(sessionId, StatutDemande.VALIDEE);

        for (DemandeInscription demande : demandesValidees) {

            Apprenant apprenant = apprenantRepository
                .findByEmail(demande.getEmail())
                .orElseGet(() -> creerApprenant(demande));

            boolean dejaInscrit = inscriptionRepository
                .existsByApprenantAndSession(apprenant, session);

            if (!dejaInscrit) {
                creerEtSauvegarderInscription(apprenant, session);
            }
        }
    }


    private Apprenant creerApprenant(DemandeInscription demande) {
        Apprenant apprenant = new Apprenant();
        apprenant.setEmail(demande.getEmail());
        apprenant.setNom(demande.getNom());
        apprenant.setPrenom(demande.getPrenom());
        apprenant.setMotDePasse(null);
        apprenant.setRole(RoleUtilisateur.APPRENANT);

        return apprenantRepository.save(apprenant);
    }

}


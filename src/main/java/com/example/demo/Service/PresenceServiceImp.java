package com.example.demo.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.Request.PresenceRequestDTO;
import com.example.demo.DTO.Response.LignePresenceResponseDTO;
import com.example.demo.DTO.Response.PresenceResponseDTO;
import com.example.demo.DTO.Response.TableauPresenceResponseDTO;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Presence;
import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.StatutInscription;
import com.example.demo.Enumeration.StatutPresence;
import com.example.demo.Mapper.PresenceMapper;
import com.example.demo.Repository.InscriptionRepository;
import com.example.demo.Repository.PresenceRepository;
import com.example.demo.Repository.SessionRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PresenceServiceImp implements PresenceService{
	private final PresenceRepository presenceRepository;
	private final InscriptionRepository inscriptionRepository;
	private final SessionRepository sessionRepository;
	private final PresenceMapper presenceMapper;

	public PresenceServiceImp(PresenceRepository presenceRepository, InscriptionRepository inscriptionRepository,
			SessionRepository sessionRepository,PresenceMapper presenceMapper) {
		super();
		this.presenceRepository = presenceRepository;
		this.inscriptionRepository = inscriptionRepository;
		this.sessionRepository = sessionRepository;
		this.presenceMapper = presenceMapper;
	}
	public Map<String, Object> initialiserPresencesSession(Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
            .orElseThrow(() -> new EntityNotFoundException("Session introuvable"));

        Integer dureeJours = session.getFormation().getDureeJours();
        if (dureeJours == null || dureeJours <= 0)
            throw new IllegalStateException("Formation sans durée définie");

        List<Inscription> inscriptions = inscriptionRepository
            .findBySession_IdAndStatut(sessionId, StatutInscription.CONFIRMEE);
        if (inscriptions.isEmpty())
            throw new IllegalStateException("Aucun apprenant confirmé");

        int compteur = 0;
        for (Inscription inscription : inscriptions) {
            for (int jour = 1; jour <= dureeJours; jour++) {
                boolean exists = presenceRepository
                    .findByInscriptionAndJourNumero(inscription, jour)
                    .isPresent();
                if (!exists) {
                	Presence p = new Presence();
                	p.setInscription(inscription);
                	p.setJourNumero(jour);
                	p.setStatut(StatutPresence.NON_SAISI);
                	p.setValideParFormateur(false);

                	
                	p.setDate(session.getDateDebut().plusDays(jour - 1));
                	p.setDureeEffective(0.0); 

                	presenceRepository.save(p);
                    compteur++;
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("message", "Fiche initialisée avec succès");
        result.put("apprenants", inscriptions.size());
        result.put("joursParApprenant", dureeJours);
        result.put("lignesCrees", compteur);
        return result;
    }

    public PresenceResponseDTO marquerPresence(PresenceRequestDTO dto) {
        Inscription inscription = inscriptionRepository.findById(dto.getInscriptionId())
            .orElseThrow(() -> new EntityNotFoundException("Inscription introuvable"));

        Integer dureeJours = inscription.getSession()
                                        .getFormation()
                                        .getDureeJours();

        if (dto.getJourNumero() < 1 || dto.getJourNumero() > dureeJours)
            throw new IllegalArgumentException(
                "Jour " + dto.getJourNumero() + " invalide, la formation dure " + dureeJours + " jours"
            );

        Presence presence = presenceRepository
            .findByInscriptionAndJourNumero(inscription, dto.getJourNumero())
            .orElse(new Presence(inscription, dto.getJourNumero()));
        presence.setStatut(dto.getStatut());
        presence.setValideParFormateur(true);
        if (dto.getCommentaireFormateur() != null)
            presence.setCommentaireFormateur(dto.getCommentaireFormateur());
        if (dto.getJustificatifAbsence() != null)
            presence.setJustificatifAbsence(dto.getJustificatifAbsence());

        Presence saved = presenceRepository.save(presence);

        return presenceMapper.toDto(saved, dureeJours);
    }

    @Transactional(readOnly = true)
    public TableauPresenceResponseDTO getTableauPresence(Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
            .orElseThrow(() -> new EntityNotFoundException("Session introuvable"));

        Integer dureeJours = session.getFormation().getDureeJours();

        List<String> joursLabels = new ArrayList<>();
        for (int i = 1; i <= dureeJours; i++)
            joursLabels.add("Jour " + i + "/" + dureeJours);

        List<Presence> toutesPresences =
            presenceRepository.findBySessionIdWithDetails(sessionId);

        Map<Long, List<Presence>> parInscription = toutesPresences.stream()
            .collect(Collectors.groupingBy(p -> p.getInscription().getId()));

        List<LignePresenceResponseDTO> lignes = new ArrayList<>();
        for (Map.Entry<Long, List<Presence>> entry : parInscription.entrySet()) {
            Presence premiere = entry.getValue().get(0);
            Apprenant apprenant = premiere.getInscription().getApprenant();

            LignePresenceResponseDTO ligne = new LignePresenceResponseDTO();
            ligne.setInscriptionId(entry.getKey());
            ligne.setApprenantId(apprenant.getId());
            ligne.setNomApprenant(apprenant.getNom());
            ligne.setPrenomApprenant(apprenant.getPrenom());

            Map<Integer, PresenceResponseDTO> presencesParJour = new LinkedHashMap<>();
            for (int jour = 1; jour <= dureeJours; jour++) {
                final int jourFinal = jour;
                entry.getValue().stream()
                    .filter(p -> p.getJourNumero().equals(jourFinal))
                    .findFirst()
                    .ifPresentOrElse(
                        p -> presencesParJour.put(jourFinal,
                                presenceMapper.toDto(p, dureeJours)),
                        () -> presencesParJour.put(jourFinal,
                                toDTOVide(jourFinal, dureeJours))
                    );
            }

            ligne.setPresencesParJour(presencesParJour);
            lignes.add(ligne);
        }

        TableauPresenceResponseDTO tableau = new TableauPresenceResponseDTO();
        tableau.setSessionId(sessionId);
        tableau.setNomFormation(session.getFormation().getTitre());
        tableau.setDureeJours(dureeJours);
        tableau.setJoursLabels(joursLabels);
        tableau.setLignes(lignes);
        return tableau;
    }

    private PresenceResponseDTO toDTOVide(Integer jourNumero, Integer dureeJours) {
        PresenceResponseDTO dto = new PresenceResponseDTO();
        dto.setId(null);
        dto.setJourNumero(jourNumero);
        dto.setJourLabel("Jour " + jourNumero + "/" + dureeJours);
        dto.setStatut(StatutPresence.NON_SAISI);
        dto.setValideParFormateur(false);
        return dto;
    }


}

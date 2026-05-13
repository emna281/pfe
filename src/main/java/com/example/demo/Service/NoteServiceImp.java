package com.example.demo.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DTO.Request.noteRequest;
import com.example.demo.DTO.Response.noteResponse;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Note;
import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.Evaluation;
import com.example.demo.Enumeration.StatutInscription;
import com.example.demo.Repository.ApprenantRepository;
import com.example.demo.Repository.InscriptionRepository;
import com.example.demo.Repository.NoteRepository;
import com.example.demo.Repository.SessionRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class NoteServiceImp implements NoteService{
	private final NoteRepository noteRepository;
    private final SessionRepository sessionRepository;
    private final InscriptionRepository inscriptionRepository;
    private final double NOTE_PASSAGE = 10.0;
	public NoteServiceImp(NoteRepository noteRepository, SessionRepository sessionRepository,
			InscriptionRepository inscriptionRepository) {
		super();
		this.noteRepository = noteRepository;
		this.sessionRepository = sessionRepository;
		this.inscriptionRepository = inscriptionRepository;
	}
    
	@Override
    public List<noteResponse> initialiserNotesSession(Long sessionId) {
        sessionRepository.findById(sessionId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Session non trouvée"));

        List<Inscription> inscriptions = inscriptionRepository
            .findBySession_IdAndStatut(sessionId, StatutInscription.CONFIRMEE);

        List<Note> nouvelles = inscriptions.stream()
            .filter(i -> !noteRepository.existsByInscriptionId(i.getId()))
            .map(inscription -> {
                Note note = new Note();
                note.setInscription(inscription);
                note.setNote(null);
                note.setReusit(null);
                note.setEvaluation(null);
                return note;
            })
            .toList();

        noteRepository.saveAll(nouvelles);
        return getTableauNotes(sessionId);
    }

    @Override
    public noteResponse ajouterNote(Long sessionId, noteRequest request) {
        Inscription inscription = inscriptionRepository.findById(request.getInscriptionId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Inscription non trouvée"));

        if (!inscription.getSession().getId().equals(sessionId)) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Cette inscription n'appartient pas à cette session");
        }

        Note note = noteRepository.findByInscriptionId(request.getInscriptionId())
            .orElseGet(() -> {
                Note n = new Note();
                n.setInscription(inscription);
                return n;
            });

        note.setNote(request.getNote());
        note.setReusit(request.getNote() >= NOTE_PASSAGE);
        note.setEvaluation(determinerEvaluation(request.getNote()));

        return toResponse(noteRepository.save(note));
    }

    @Override
    public List<noteResponse> getTableauNotes(Long sessionId) {
        return noteRepository.findByInscriptionSessionId(sessionId)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    private Evaluation determinerEvaluation(Long note) {
        if (note >= 16) return Evaluation.EXCELLENT;
        if (note >= 14) return Evaluation.TRES_BIEN;
        if (note >= 12) return Evaluation.BIEN;
        if (note >= 10) return Evaluation.PASSABLE;
        return Evaluation.INSUFFISANT;
    }

    private noteResponse toResponse(Note note) {
        noteResponse res = new noteResponse();
        res.setId(note.getId());
        res.setNote(note.getNote());
        res.setReusit(note.getReusit());
        res.setEvaluation(note.getEvaluation());
        res.setInscriptionId(note.getInscription().getId());
        res.setNomApprenant(note.getInscription().getApprenant().getNom());
        res.setPrenomApprenant(note.getInscription().getApprenant().getPrenom());
        return res;
    }

}

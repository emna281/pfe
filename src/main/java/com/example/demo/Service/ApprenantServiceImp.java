package com.example.demo.Service;
import com.example.demo.DTO.Response.ApprenantAvecCodeDTO;
import com.example.demo.DTO.Response.CodeRemiseInfoDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;
import com.example.demo.DTO.Response.InscriptionResponseDTO;
import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.Inscription;
import com.example.demo.Enumeration.StatutInscription;
import com.example.demo.Mapper.FactureMapper;
import com.example.demo.Mapper.SessionMapper;
import com.example.demo.Mapper.UtilisateurMapper;
import com.example.demo.Repository.ApprenantRepository;
import com.example.demo.Repository.CodeRemiseRepository;
import com.example.demo.Repository.FactureRepository;
import com.example.demo.Repository.InscriptionRepository;
import com.example.demo.Security.JwtUtil;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class ApprenantServiceImp implements ApprenantService{
	private final ApprenantRepository apprenantRepository;
    private final UtilisateurMapper utilisateurMapper;
    private final InscriptionService inscriptionService;
    private final JwtUtil jwtUtil;
    private final SessionMapper sessionMapper;
   private final InscriptionRepository inscriptionRepository;
   private final FactureRepository factureRepository;
   	private final FactureMapper factureMapper;
   	private final CodeRemiseRepository codeRemiseRepository;

    public ApprenantServiceImp(ApprenantRepository apprenantRepository, UtilisateurMapper utilisateurMapper,FactureRepository factureRepository,CodeRemiseRepository codeRemiseRepository,
			JwtUtil jwtUtil,InscriptionService inscriptionService,SessionMapper sessionMapper,InscriptionRepository inscriptionRepository,FactureMapper factureMapper) {
		super();
		this.apprenantRepository = apprenantRepository;
		this.utilisateurMapper = utilisateurMapper;
		this.jwtUtil = jwtUtil;
		this.inscriptionService=inscriptionService;
		this.sessionMapper=sessionMapper;
		this.inscriptionRepository=inscriptionRepository;
		this.factureRepository = factureRepository;
		this.factureMapper= factureMapper ;
		this.codeRemiseRepository= codeRemiseRepository;
	}



	@Override
    public UtilisateurResponse getMonProfil(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);

        Apprenant apprenant = apprenantRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Apprenant introuvable"
            ));

        UtilisateurResponse response = utilisateurMapper.toResponse(apprenant);

        response.setPosteActuel(apprenant.getPosteActuel());
        response.setNiveauEtude(apprenant.getNiveauEtude());
        response.setNumeroEnregistrement(apprenant.getNumeroEnregistrement());

        return response;
    }
	@Override
	public List<InscriptionResponseDTO> getMesInscriptions(String authHeader) {
	    String token = authHeader.replace("Bearer ", "");
	    String email = jwtUtil.extractEmail(token);

	    Apprenant apprenant = apprenantRepository.findByEmail(email)
	        .orElseThrow(() -> new ResponseStatusException(
	            HttpStatus.NOT_FOUND, "Apprenant introuvable"
	        ));

	    return inscriptionService.getInscriptionsByApprenant(apprenant.getId());
	}
	@Override
	public List<SessionDTO> getMesSessions(String authHeader) {
	    String token = authHeader.replace("Bearer ", "");
	    String email = jwtUtil.extractEmail(token);

	    Apprenant apprenant = apprenantRepository.findByEmail(email)
	        .orElseThrow(() -> new ResponseStatusException(
	            HttpStatus.NOT_FOUND, "Apprenant introuvable"
	        ));

	    List<Inscription> inscriptions = inscriptionRepository
	        .findByApprenantId(apprenant.getId());

	    return inscriptions.stream()
	        .map(Inscription::getSession)
	        .map(sessionMapper::toDTO)
	        .toList();
	}
	@Override
	public List<FactureResponseDTO> getMesFactures(String authHeader) {
	    String email = jwtUtil.extractEmail(authHeader.replace("Bearer ", ""));
	    Apprenant apprenant = apprenantRepository.findByEmail(email)
	        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Apprenant introuvable"));

	    List<Inscription> inscriptions = inscriptionRepository.findByApprenantId(apprenant.getId());

	    return inscriptions.stream()
	        .map(i -> factureRepository.findByInscriptionId(i.getId()))
	        .filter(Optional::isPresent)
	        .map(Optional::get)
	        .map(factureMapper::toDTO) 
	        .toList();
	}
	@Override
	public void noterInscription(Long inscriptionId, Integer noteFormateur, Integer noteFormation, String authHeader) {
	    String email = jwtUtil.extractEmail(authHeader.replace("Bearer ", ""));
	    Apprenant apprenant = apprenantRepository.findByEmail(email)
	        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Apprenant introuvable"));

	    Inscription inscription = inscriptionRepository.findById(inscriptionId)
	        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Inscription introuvable"));

	    if (!inscription.getApprenant().getId().equals(apprenant.getId())) {
	        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé");
	    }

	    if (inscription.getStatut() != StatutInscription.TERMINEE) {
	        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La session n'est pas encore terminée");
	    }

	    inscription.setNoteFormateur(noteFormateur);
	    inscription.setNoteFormation(noteFormation);
	    inscriptionRepository.save(inscription);
	}
	@Override
	public List<ApprenantAvecCodeDTO> getApprenantsAvecCodes() {
	    return apprenantRepository.findAll().stream().map(a -> {
	        ApprenantAvecCodeDTO dto = new ApprenantAvecCodeDTO();
	        dto.setId(a.getId());
	        dto.setNom(a.getNom());
	        dto.setPrenom(a.getPrenom());
	        dto.setEmail(a.getEmail());
	        dto.setTelephone(a.getTelephone());
	        dto.setDateCreation(a.getDateCreation());

	        codeRemiseRepository
	            .findByApprenantIdAndActifTrueAndUtiliseFalse(a.getId())
	            .ifPresent(code -> {
	                CodeRemiseInfoDTO codeDTO = new CodeRemiseInfoDTO();
	                codeDTO.setCode(code.getCode());
	                codeDTO.setPourcentage(code.getPourcentage());
	                codeDTO.setDateExpiration(code.getDateExpiration());
	                dto.setCodeRemiseActif(codeDTO);
	            });

	        return dto;
	    }).collect(Collectors.toList());
	}

}

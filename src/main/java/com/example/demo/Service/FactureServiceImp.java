package com.example.demo.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DTO.Request.FactureRequestDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;
import com.example.demo.Entity.Facture;
import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Paiement;
import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.StatutFacture;
import com.example.demo.Mapper.FactureMapper;
import com.example.demo.Repository.FactureRepository;
import com.example.demo.Repository.InscriptionRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class FactureServiceImp implements FactureService{
	private FactureMapper factureMapper;
	private FactureRepository factureRepository ;
	private InscriptionRepository inscriptionRepository;
	private EmailService emailService;
	private static final Logger logger = LoggerFactory.getLogger(FactureServiceImp.class);
	
	public FactureServiceImp(FactureMapper factureMapper, FactureRepository factureRepository,InscriptionRepository inscriptionRepository,EmailService emailService) {
		super();
		this.factureMapper = factureMapper;
		this.factureRepository = factureRepository;
		this.inscriptionRepository = inscriptionRepository;
		this.emailService=emailService;
	}


	@Override
	public FactureResponseDTO updateFacture(Long id, FactureRequestDTO request) {

	    Facture facture = factureRepository.findById(id)
	        .orElseThrow(() -> new EntityNotFoundException("Facture non trouvée avec l'id : " + id));

	    if (request.getDateEcheance() != null) {
	        if (request.getDateEcheance().isBefore(LocalDate.now())) {
	            throw new IllegalArgumentException("La date d'échéance doit être dans le futur");
	        }
	        facture.setDateEcheance(request.getDateEcheance());
	    }

	    if (request.getNotes() != null) {
	        facture.setNotes(request.getNotes());
	    }

	    Facture updated = factureRepository.save(facture);
	    return factureMapper.toDTO(updated);
	}
	    
	@Override
	public FactureResponseDTO updateStatut(Long id, StatutFacture nouveauStatut) {
	    Facture facture = factureRepository.findById(id)
	        .orElseThrow(() -> new EntityNotFoundException("Facture non trouvée"));

	    if (facture.getStatut() == StatutFacture.PAYEE && 
	        nouveauStatut != StatutFacture.ANNULEE) {
	        throw new RuntimeException("Une facture payée ne peut qu'être annulée");
	    }

	    if (facture.getStatut() == StatutFacture.ANNULEE) {
	        throw new RuntimeException("Une facture annulée ne peut pas changer de statut");
	    }

	    facture.setStatut(nouveauStatut);
	    if (nouveauStatut == StatutFacture.PAYEE ||
	        nouveauStatut == StatutFacture.ANNULEE) {
	        facture.setArchive(true);
	    }

	    return factureMapper.toDTO(factureRepository.save(facture));
	}
	  	@Override
	  	public List<FactureResponseDTO> getAllFactures() {
	  	    List<Facture> factures = factureRepository.findByArchiveFalse();
	  	    return factureMapper.toDTOList(factures);
	  	}
	  	@Override
	  	public List<FactureResponseDTO> getFacturesArchivees() {
	  	    List<Facture> factures = factureRepository.findByArchiveTrue();
	  	    return factureMapper.toDTOList(factures);
	  	}
	  	@Override
	  	public FactureResponseDTO getFactureById(Long id) {

	  	    Facture facture = factureRepository.findById(id)
	  	            .orElseThrow(() -> new EntityNotFoundException("Facture non trouvée"));

	  	    return factureMapper.toDTO(facture);
	  	}
	  	@Override
	  	public FactureResponseDTO getFactureByInscription(Long inscriptionId) {
	  	    Facture facture = factureRepository.findByInscriptionId(inscriptionId)
	  	        .orElseThrow(() -> new EntityNotFoundException(
	  	            "Facture non trouvée pour l'inscription : " + inscriptionId
	  	        ));
	  	    return factureMapper.toDTO(facture);
	  	}
	    
	  	public FactureResponseDTO creerFacture(FactureRequestDTO request) {

	  	    Inscription inscription = inscriptionRepository.findById(request.getInscriptionId())
	  	        .orElseThrow(() -> new ResponseStatusException(
	  	            HttpStatus.NOT_FOUND,
	  	            "Inscription non trouvée avec l'ID: " + request.getInscriptionId()));

	  	    if (Boolean.TRUE.equals(inscription.getFacturee())) {
	  	        throw new ResponseStatusException(
	  	            HttpStatus.BAD_REQUEST,
	  	            "L'inscription ID " + request.getInscriptionId() + " est déjà facturée");
	  	    }

	  	    Session session = inscription.getSession();
	  	    BigDecimal prixSession = session.getPrix();

	  	    BigDecimal montantHT = prixSession;
	  	    BigDecimal tva = montantHT.multiply(new BigDecimal("0.20"));
	  	    BigDecimal montantTTC = montantHT.add(tva);

	  	    Facture facture = factureMapper.toEntity(request);

	  	    facture.setInscription(inscription);
	  	    facture.setNumeroFacture(genererNumeroFacture());
	  	    facture.setDateEmission(LocalDate.now());
	  	    facture.setMontantHT(montantHT);
	  	    facture.setMontantTVA(tva);
	  	    facture.setMontantTTC(montantTTC);
	  	    facture.setRemise(BigDecimal.ZERO);
	  	    facture.setStatut(StatutFacture.EMISE);

	  	    Facture saved = factureRepository.save(facture);

	  	    inscription.setFacturee(true);
	  	    inscriptionRepository.save(inscription);

	  	    logger.info("Facture {} créée pour l'inscription ID: {}",
	  	        saved.getNumeroFacture(), inscription.getId());

	  	    FactureResponseDTO dto = factureMapper.toDTO(saved);
	  	    return enrichirAvecMontants(dto, saved);
	  	}

	  	private FactureResponseDTO enrichirAvecMontants(FactureResponseDTO dto, Facture facture) {
	  	    BigDecimal montantPaye = facture.getPaiements().stream()
	  	        .map(Paiement::getMontant)
	  	        .reduce(BigDecimal.ZERO, BigDecimal::add);

	  	    dto.setMontantPaye(montantPaye);
	  	    dto.setMontantRestant(facture.getMontantTTC().subtract(montantPaye));
	  	    return dto;
	  	}

	  	private String genererNumeroFacture() {
	  	    String datePart = LocalDate.now().toString().replace("-", "");
	  	    String randomPart = String.format("%04d", (int)(Math.random() * 10000));
	  	    return "FACT-" + datePart + "-" + randomPart;
	  	}
	  	@Override
	  	public List<FactureResponseDTO> getFacturesEnRetard() {
	  	    LocalDate aujourdhui = LocalDate.now();
	  	    return factureRepository
	  	        .findAll()
	  	        .stream()
	  	        .filter(f -> f.getDateEcheance().isBefore(aujourdhui)
	  	                  && !f.getStatut().equals(StatutFacture.PAYEE)
	  	                && f.getStatut() != StatutFacture.ANNULEE)
	  	        .map(factureMapper::toDTO)
	  	        .collect(Collectors.toList());
	  	}
	  	
	  	private BigDecimal calculerMontantRestant(Facture facture) {
	  	    BigDecimal montantPaye = facture.getPaiements() == null ? BigDecimal.ZERO :
	  	        facture.getPaiements().stream()
	  	            .map(Paiement::getMontant)
	  	            .reduce(BigDecimal.ZERO, BigDecimal::add);
	  	    
	  	    return facture.getMontantTTC() == null ? BigDecimal.ZERO :
	  	        facture.getMontantTTC().subtract(montantPaye).max(BigDecimal.ZERO);
	  	}
	  	@Override
	  	public List<FactureResponseDTO> getEcheancesProches() {
	  	    LocalDate aujourdhui = LocalDate.now();
	  	    LocalDate dans7Jours = aujourdhui.plusDays(7);
	  	    return factureRepository
	  	        .findAll()
	  	        .stream()
	  	        .filter(f -> !f.getDateEcheance().isBefore(aujourdhui)
	  	                  && f.getDateEcheance().isBefore(dans7Jours)
	  	                  && !f.getStatut().equals(StatutFacture.PAYEE))
	  	        .map(factureMapper::toDTO)
	  	        .collect(Collectors.toList());
	  	}
	  	@Override
	  	public void relancerFacture(Long id) {
	  	    Facture facture = factureRepository.findById(id)
	  	        .orElseThrow(() -> new RuntimeException("Facture introuvable"));
	  	  BigDecimal montantRestant = calculerMontantRestant(facture);
	  	  
	  	    emailService.envoyerRelance(
	  	        facture.getInscription().getApprenant().getEmail(),
	  	        facture.getInscription().getApprenant().getPrenom(),
	  	        facture.getNumeroFacture(),
	  	        montantRestant,
	  	        facture.getDateEcheance()
	  	    );
	  	}
	  	@Override
	  	public void envoyerAlerte(Long id) {
	  	    Facture facture = factureRepository.findById(id)
	  	        .orElseThrow(() -> new RuntimeException("Facture introuvable"));

	  	  BigDecimal montantRestant = calculerMontantRestant(facture);
	  	  
	  	    emailService.envoyerAlerte(
	  	        facture.getInscription().getApprenant().getEmail(),
	  	        facture.getInscription().getApprenant().getPrenom(),
	  	        facture.getNumeroFacture(),
	  	      montantRestant,
	  	        facture.getDateEcheance()
	  	    );
	  	}
	  	@Override
	  	public void archiverFacture(Long id) {
	  	    Facture facture = factureRepository.findById(id)
	  	        .orElseThrow(() -> new EntityNotFoundException("Facture non trouvée"));
	  	    facture.setArchive(true);
	  	    facture.setStatut(StatutFacture.ANNULEE);
	  	    factureRepository.save(facture);
	  	}

}

package com.example.demo.Service;

import java.math.BigDecimal;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.Request.PaiementRequestDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;
import com.example.demo.Entity.Facture;
import com.example.demo.Entity.Paiement;
import com.example.demo.Enumeration.StatutFacture;
import com.example.demo.Mapper.FactureMapper;
import com.example.demo.Mapper.PaiementMapper;
import com.example.demo.Repository.FactureRepository;
import com.example.demo.Repository.PaiementRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class PaiementServiceImp implements PaiementService{
	private final FactureRepository factureRepository;
	private final PaiementRepository paiementRepository;
	private final PaiementMapper paiementMapper;
	private final FactureMapper factureMapper ;
	private final CodeRemiseService codeRemiseService;
	
	public PaiementServiceImp(FactureRepository factureRepository, PaiementRepository paiementRepository,
			PaiementMapper paiementMapper, FactureMapper factureMapper,@Lazy CodeRemiseService codeRemiseService) {
		super();
		this.factureRepository = factureRepository;
		this.paiementRepository = paiementRepository;
		this.paiementMapper = paiementMapper;
		this.factureMapper = factureMapper;
		this.codeRemiseService=codeRemiseService;
	}

	@Override
	public FactureResponseDTO ajouterPaiement(Long factureId, PaiementRequestDTO request) {

	    Facture facture = factureRepository.findById(factureId)
	        .orElseThrow(() -> new EntityNotFoundException("Facture non trouvée : " + factureId));
	    
	    if (request.getCodeRemise() != null && !request.getCodeRemise().isBlank()) {
            codeRemiseService.appliquerCode(factureId, request.getCodeRemise());
            facture = factureRepository.findById(factureId)
                .orElseThrow(() -> new EntityNotFoundException("Facture non trouvée"));
        }

	    if (request.getMontant() == null || request.getMontant().compareTo(BigDecimal.ZERO) <= 0) {
	        throw new IllegalArgumentException("Le montant doit être supérieur à 0");
	    }

	    if (request.getDatePaiement() == null) {
	        throw new IllegalArgumentException("La date de paiement est obligatoire");
	    }

	    if (facture.getDateEcheance() != null &&
	        request.getDatePaiement().isAfter(facture.getDateEcheance())) {
	        throw new IllegalArgumentException(
	            "La date de paiement dépasse la date d'échéance : " + facture.getDateEcheance()
	        );
	    }

	    BigDecimal montantPaye = facture.getPaiements().stream()
	        .map(Paiement::getMontant)
	        .reduce(BigDecimal.ZERO, BigDecimal::add);

	    BigDecimal montantRestant = facture.getMontantTTC().subtract(montantPaye);

	    if (request.getMontant().compareTo(montantRestant) > 0) {
	        throw new IllegalArgumentException(
	            "Le montant dépasse le restant à payer : " + montantRestant + " TND"
	        );
	    }

	    Paiement paiement = paiementMapper.toEntity(request);
	    paiement.setFacture(facture);
	    paiementRepository.save(paiement);

	    BigDecimal nouveauMontantPaye = montantPaye.add(request.getMontant());
	    BigDecimal nouveauMontantRestant = facture.getMontantTTC().subtract(nouveauMontantPaye);

	    if (nouveauMontantRestant.compareTo(BigDecimal.ZERO) <= 0) {
	        facture.setStatut(StatutFacture.PAYEE);
	        facture.setArchive(true);
	    } else {
	        facture.setStatut(StatutFacture.PARTIELLEMENT_PAYEE);
	    }

	    factureRepository.save(facture);

	    Facture updatedFacture = factureRepository.findById(factureId).get();
	    return factureMapper.toDTO(updatedFacture);
	}

}

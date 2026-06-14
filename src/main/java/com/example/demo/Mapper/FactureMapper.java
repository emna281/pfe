package com.example.demo.Mapper;

import java.math.BigDecimal;
import java.util.List;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.DTO.Request.FactureRequestDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;
import com.example.demo.Entity.Facture;
import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Paiement;

@Mapper(componentModel="spring",uses= {PaiementMapper.class})
public interface FactureMapper {
	
	@Mapping(target = "inscriptionId", source = "inscription.id")
	@Mapping(target = "apprenantId", source = "inscription.apprenant.id")
    @Mapping(target = "apprenantNom", source = "inscription.apprenant.nom")
    @Mapping(target = "apprenantPrenom", source = "inscription.apprenant.prenom")
	@Mapping(target = "apprenantEmail", source = "inscription.apprenant.email")  
	@Mapping(target = "sessionId", source = "inscription.session.id") 
    @Mapping(target = "sessionNom", source = "inscription.session.nom")
    @Mapping(target = "formationTitre", source = "inscription.session.formation.titre")
    @Mapping(target = "paiements", source = "paiements")
    @Mapping(target = "montantRestant", expression = "java(calculReste(facture))")
	@Mapping(target = "montantPaye",expression = "java(calculPaye(facture))")
    FactureResponseDTO toDTO(Facture facture);
	
	@Mapping(target = "id", ignore = true)
    @Mapping(target = "numeroFacture", ignore = true)
    @Mapping(target = "dateEmission", ignore = true)
    @Mapping(target = "statut", ignore = true)
    @Mapping(target = "montantHT", ignore = true)
    @Mapping(target = "montantTVA", ignore = true)
    @Mapping(target = "montantTTC", ignore = true)
    @Mapping(target = "remise", ignore = true)
    @Mapping(target = "inscription",ignore =true)
	@Mapping(target = "archive", ignore = true) 
    @Mapping(target = "paiements", ignore = true)
    
	Facture toEntity(FactureRequestDTO requestDTO);
	
	@Mapping(target = "id", ignore = true) 
    @Mapping(target = "numeroFacture", ignore = true)
    @Mapping(target = "dateEmission", ignore = true)
    @Mapping(target = "statut", ignore = true)
    @Mapping(target = "montantHT", ignore = true)
    @Mapping(target = "montantTVA", ignore = true)
    @Mapping(target = "montantTTC", ignore = true)
    @Mapping(target = "inscription", ignore = true)
	@Mapping(target = "archive", ignore = true) 
    @Mapping(target = "paiements", ignore = true)
    
    void updateEntity(FactureRequestDTO dto, @MappingTarget Facture facture);
	
	 List<FactureResponseDTO> toDTOList(List<Facture> factures);
	
	 default BigDecimal calculPaye(Facture facture) {
		    return facture.getPaiements() == null ? BigDecimal.ZERO :
		        facture.getPaiements().stream()
		            .map(Paiement::getMontant)
		            .reduce(BigDecimal.ZERO, BigDecimal::add);
		}
	 default BigDecimal calculReste(Facture facture) {
		    BigDecimal paye = calculPaye(facture);
		    return facture.getMontantTTC() == null
		        ? BigDecimal.ZERO
		        : facture.getMontantTTC().subtract(paye);
		}
}

package com.example.demo.Mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.DTO.Response.InscriptionResponseDTO;
import com.example.demo.Entity.Inscription;

@Mapper(componentModel="spring")
public interface InscriptionMapper {
	@Mapping(source = "session.nom",         target = "sessionNom")
    @Mapping(source = "session.code",        target = "sessionCode")
    @Mapping(source = "apprenant.nom",       target = "apprenantNom")
    @Mapping(source = "apprenant.prenom",    target = "apprenantPrenom")
    @Mapping(source = "apprenant.email",     target = "apprenantEmail")
    @Mapping(source = "facture.numeroFacture", target = "numeroFacture")
    @Mapping(source = "facture.statut",      target = "statutFacture")
	 @Mapping(target = "prixSession", source = "session.prix")
    InscriptionResponseDTO toDTO(Inscription inscription);

	List<InscriptionResponseDTO> toDTOList(List<Inscription>inscriptions);
}

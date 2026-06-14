package com.example.demo.Mapper;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.DTO.Request.PresenceRequestDTO;
import com.example.demo.DTO.Response.PresenceResponseDTO;
import com.example.demo.Entity.Presence;

@Mapper(componentModel = "spring")
public interface PresenceMapper {
    @Mapping(source = "inscription.id", target = "inscriptionId")
    @Mapping(source = "inscription.apprenant.nom", target = "nomApprenant")
    @Mapping(source = "inscription.apprenant.prenom", target = "prenomApprenant")
    @Mapping(target = "jourLabel", 
             expression = "java(getJourLabel(presence.getJourNumero(), dureeJours))")
    PresenceResponseDTO toDto(Presence presence, @Context Integer dureeJours);

    @Mapping(target = "inscription", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "valideParFormateur", ignore = true)
    @Mapping(target = "heureArrivee", ignore = true)
    @Mapping(target = "heureDepart", ignore = true)
    @Mapping(target = "dureeEffective", ignore = true)
    @Mapping(target = "statut", ignore = true)
    Presence toEntity(PresenceRequestDTO dto);

    default String getJourLabel(Integer jourNumero, Integer dureeJours) {
        return "Jour " + jourNumero + "/" + dureeJours;
    }
	
}

package com.example.demo.Mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.DTO.Request.SessionRequest;
import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.Entity.Charge;
import com.example.demo.Entity.Facture;
import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Session;

@Mapper(componentModel = "spring")
public interface SessionMapper {

    @Mapping(target = "formationCode", source = "formation.code")
    @Mapping(target = "formationNom", source = "formation.titre")
    @Mapping(target = "inscriptionIds", source = "inscriptions")
    @Mapping(target = "factureIds", expression = "java(mapFactureIds(session))")  
    @Mapping(target = "chargeIds", source = "charge")    
    @Mapping(target = "formateurId", source = "formateur.id")
    @Mapping(target = "formateurNom", source = "formateur.nom")
    @Mapping(target = "salleCode", source = "salle.id")
    //@Mapping(target = "salleNom", source = "salle.nom")
    //@Mapping(target = "nombrePresences", expression = "java(session.getPresences() != null ? session.getPresences().size() : 0)")
    SessionDTO toDTO(Session session);

    List<SessionDTO> toSessionDTOList(List<Session> sessions);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "placesRestantes", ignore = true)
    @Mapping(target = "statut", ignore = true)
    @Mapping(target = "inscriptions", ignore = true)
    @Mapping(target = "charge", ignore = true)
    @Mapping(target = "formation", ignore = true)
    @Mapping(target = "formateur", ignore = true)
    @Mapping(target = "salle", ignore = true)
    @Mapping(target = "archive", ignore = true)     
    
    Session toEntity(SessionRequest request);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "formation", ignore = true)
    @Mapping(target = "inscriptions", ignore = true)
    @Mapping(target = "charge", ignore = true)
    @Mapping(target = "prix", ignore = true) // 🔴 IMPORTANT
    @Mapping(target = "placesRestantes", ignore = true)
    void updateEntity(@MappingTarget Session session, SessionRequest request);

    default List<Long> mapInscriptionsToIds(List<Inscription> inscriptions) {
        if (inscriptions == null) return null;
        return inscriptions.stream().map(Inscription::getId).toList();
    }

    default List<Long> mapFactureIds(Session session) {
        if (session.getInscriptions() == null) return null;
        return session.getInscriptions().stream()
            .filter(i -> i.getFacture() != null)
            .map(i -> i.getFacture().getId())
            .collect(java.util.stream.Collectors.toList());
    }

    default List<Long> mapChargesToIds(List<Charge> charges) {
        if (charges == null) return null;
        return charges.stream().map(Charge::getId).toList();
    }
}
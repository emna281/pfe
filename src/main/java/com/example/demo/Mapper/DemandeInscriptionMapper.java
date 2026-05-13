package com.example.demo.Mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.DTO.Request.DemandeInscriptionRequest;
import com.example.demo.DTO.Request.FormationRequest;
import com.example.demo.DTO.Response.DemandeInscriptionResponse;
import com.example.demo.DTO.Response.FormationAdminDTO;
import com.example.demo.Entity.DemandeInscription;
import com.example.demo.Entity.Formation;

@Mapper(componentModel="spring")
public interface DemandeInscriptionMapper {
	
	@Mapping(source = "session.id", target = "sessionId")
	@Mapping(source = "session.code", target = "sessionCode")
	DemandeInscriptionResponse toDTO(DemandeInscription demandeInscription);

    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "session", ignore = true)
    @Mapping(target = "dateDemande", ignore = true) 
    @Mapping(target = "statut",      ignore = true) 
    @Mapping(target = "apprenant", ignore = true)
    @Mapping(target = "inscription", ignore = true)
    DemandeInscription toEntity(DemandeInscriptionRequest request);
    
   
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "session", ignore = true)
    @Mapping(target = "dateDemande", ignore = true) 
    @Mapping(target = "statut",      ignore = true) 
    @Mapping(target = "apprenant", ignore = true)
    @Mapping(target = "inscription", ignore = true)
    void updateEntity(@MappingTarget DemandeInscription demandeInscription, DemandeInscriptionRequest request);
 
    
    List<DemandeInscriptionResponse> toDTOList(List<DemandeInscription> demandesInscription);
}

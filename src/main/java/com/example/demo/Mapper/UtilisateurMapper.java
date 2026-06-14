package com.example.demo.Mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.DTO.Request.CreateUtilisateurRequest;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Entity.Financier;
import com.example.demo.Entity.Formateur;
import com.example.demo.Entity.Manager;
import com.example.demo.Entity.Planificateur;
import com.example.demo.Entity.Utilisateur;

@Mapper(componentModel = "spring")
public interface UtilisateurMapper {
	@Mapping(target = "id", ignore = true)
    @Mapping(target = "motDePasse", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    @Mapping(target = "disponibilite", ignore = true)
    @Mapping(target = "noteMoyenne", ignore = true)
    @Mapping(target = "heuresEnseigneesTotal", ignore = true)
    @Mapping(target = "dateEntree", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    @Mapping(target = "centre", ignore = true)
    @Mapping(target = "competencesList", ignore = true)
    @Mapping(target = "diplomes", ignore = true)
    Formateur toFormateur(CreateUtilisateurRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "motDePasse", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    Planificateur toPlanificateur(CreateUtilisateurRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "motDePasse", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    Manager toManager(CreateUtilisateurRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "motDePasse", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    
    Financier toFinancier(CreateUtilisateurRequest request);
    @Mapping(target = "competences", ignore = true)
    UtilisateurResponse toResponse(Utilisateur utilisateur);
    
    @Mapping(target = "competences", source = "competencesList")
    UtilisateurResponse toFormateurResponse(Formateur formateur);

    List<UtilisateurResponse> toResponseList(List<Utilisateur> utilisateurs);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "motDePasse", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    void updateEntity(@MappingTarget Utilisateur utilisateur, CreateUtilisateurRequest request);

}

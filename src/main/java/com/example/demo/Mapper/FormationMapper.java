package com.example.demo.Mapper;

import java.util.Collections;
import java.util.List;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Collectors;


import com.example.demo.DTO.Request.FormationRequest;
import com.example.demo.DTO.Response.FormationAdminDTO;
import com.example.demo.DTO.Response.SessionDTO;
import com.example.demo.Entity.Competence;
import com.example.demo.Entity.Formation;
import com.example.demo.Entity.Session;
import com.example.demo.Repository.CompetenceRepository;

@Mapper(componentModel="spring", uses = {CompetenceMapper.class})
public abstract class FormationMapper {
	
	
	@Autowired
    private CompetenceRepository competenceRepository;
	
    // Entity → DTO
	//@Mapping(target = "statistiques", ignore = true)
	@Mapping(target = "codesSessions",source = "sessions")
    @Mapping(target = "competenceDetail", source = "competences")
	
	public abstract FormationAdminDTO toDTO(Formation formation);
    
    // Request → Entity (création)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    @Mapping(target = "competences", expression = "java(resolveCompetences(request.getCompetenceNoms()))")
   
    public abstract Formation toEntity(FormationRequest request);
    
    // Update Entity from Request
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    @Mapping(target = "competences", expression = "java(resolveCompetences(request.getCompetenceNoms()))")
    @Mapping(target = "code", ignore = true)
    public abstract void updateEntity(@MappingTarget Formation formation, FormationRequest request);
    
    // Liste
    public abstract List<FormationAdminDTO> toDTOList(List<Formation> formations);
    
    protected List<Competence> resolveCompetences(List<String> noms) {
        if (noms == null || noms.isEmpty()) return Collections.emptyList();
        return competenceRepository.findByNomIn(noms);
    }

    protected List<String> mapSessionsToCodes(List<Session> sessions) {
        if (sessions == null) return Collections.emptyList();
        return sessions.stream().map(Session::getCode).toList();
    }

}

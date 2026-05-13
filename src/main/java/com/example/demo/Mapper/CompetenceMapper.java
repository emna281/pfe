package com.example.demo.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.DTO.Request.CompetenceRequest;
import com.example.demo.DTO.Request.FormationRequest;
import com.example.demo.DTO.Response.CompetenceInfoDTO;
import com.example.demo.Entity.Competence;
import com.example.demo.Entity.Formation;

@Mapper(componentModel = "spring")
public interface CompetenceMapper {
    
    
    @Mapping(target = "formationCodes", expression = "java(mapFormationCodes(competence.getFormations()))")
    CompetenceInfoDTO toDTO(Competence competence);
    
    Competence toEntity(CompetenceRequest request);
    

    List<CompetenceInfoDTO> toDTOList(List<Competence> competences);
    
    void updateEntity(@MappingTarget Competence competence, CompetenceRequest request);
    
    default List<String> mapFormationCodes(List<Formation> formations) {
        if (formations == null) {
            return List.of();  
        }
        return formations.stream()
                .map(Formation::getCode)
                .collect(Collectors.toList());
    }
}
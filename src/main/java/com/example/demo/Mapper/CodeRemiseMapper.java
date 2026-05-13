package com.example.demo.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.DTO.Request.CodeRemiseRequestDTO;
import com.example.demo.DTO.Response.CodeRemiseResponseDTO;
import com.example.demo.Entity.CodeRemise;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CodeRemiseMapper {
	@Mapping(source = "apprenant.id",      target = "apprenantId")
    @Mapping(source = "apprenant.nom",     target = "apprenantNom")
    @Mapping(source = "apprenant.prenom",  target = "apprenantPrenom")
    CodeRemiseResponseDTO toResponse(CodeRemise codeRemise);

    @Mapping(target = "id",       ignore = true)
    @Mapping(target = "code",     ignore = true) 
    @Mapping(target = "actif",    ignore = true)  
    @Mapping(target = "utilise",  ignore = true)  
    @Mapping(target = "apprenant", ignore = true) 
    CodeRemise toEntity(CodeRemiseRequestDTO request);

    List<CodeRemiseResponseDTO> toListDTO(List<CodeRemise> codeRemises);

}

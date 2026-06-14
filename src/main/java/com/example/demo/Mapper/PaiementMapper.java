package com.example.demo.Mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.DTO.Request.PaiementRequestDTO;
import com.example.demo.DTO.Response.PaiementDTO;
import com.example.demo.Entity.Paiement;

@Mapper(componentModel="spring")
public interface PaiementMapper {
	PaiementDTO toDTO(Paiement paiement);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "facture", ignore = true)
    Paiement toEntity(PaiementRequestDTO requestDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "facture", ignore = true)
    void updateEntity(PaiementRequestDTO requestDTO, @MappingTarget Paiement paiement);

    List<PaiementDTO> toDTOList(List<Paiement> paiements);

}

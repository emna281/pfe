package com.example.demo.Mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.DTO.Request.ChargeRequest;
import com.example.demo.DTO.Response.ChargeResponse;
import com.example.demo.Entity.Charge;



@Mapper(componentModel = "spring")
public interface ChargeMapper {

    @Mapping(source = "session.id", target = "sessionId")
    @Mapping(source = "session.nom", target = "sessionNom")
    ChargeResponse toResponse(Charge charge);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "session", ignore = true)
    Charge toEntity(ChargeRequest request);

    List<ChargeResponse> toListDTO(List<Charge> charges);
}
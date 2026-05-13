package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.Request.FormationRequest;
import com.example.demo.DTO.Response.FormationAdminDTO;
import com.example.demo.Entity.Formation;

public interface FormationService {
	FormationAdminDTO createFormation(FormationRequest requestDTO);
    
	FormationAdminDTO updateFormation(Long id, FormationRequest requestDTO);
    
    void deleteFormation(Long id);
    
    FormationAdminDTO getFormationById(Long id);
    
    FormationAdminDTO getFormationByCode(String code);
    
    List<FormationAdminDTO> getAllFormations();
    
    List<FormationAdminDTO> getActiveFormations();
    
    List<FormationAdminDTO> searchFormationsByTitle(String keyword);
    
    //Formation addSessionToFormation(Long formationId, Long sessionId);
    
    FormationAdminDTO toggleFormationActif(Long id);

}

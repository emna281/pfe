package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.Request.CompetenceRequest;
import com.example.demo.DTO.Request.FormationRequest;
import com.example.demo.DTO.Response.CompetenceInfoDTO;
import com.example.demo.DTO.Response.FormationAdminDTO;

public interface CompetenceService {

	CompetenceInfoDTO createCompetence(CompetenceRequest requestDTO);
    
	CompetenceInfoDTO updateCompetence(Long id, CompetenceRequest requestDTO);
    
    void deleteCompetence(Long id);
    
    CompetenceInfoDTO getCompetenceById(Long id);
    
    CompetenceInfoDTO getCompetenceByCode(String code);
    
    
    
    List<CompetenceInfoDTO> getAllCompetences();
    
    //List<CompetenceInfoDTO> searchCompetenceByTitle(String keyword);

}

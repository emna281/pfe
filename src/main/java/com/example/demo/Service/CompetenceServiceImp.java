package com.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.Request.CompetenceRequest;
import com.example.demo.DTO.Response.CompetenceInfoDTO;
import com.example.demo.Entity.Competence;
import com.example.demo.Entity.Formation;
import com.example.demo.Mapper.CompetenceMapper;

import com.example.demo.Repository.CompetenceRepository;


import jakarta.transaction.Transactional;

@Service
@Transactional
public class CompetenceServiceImp implements CompetenceService{
	
	private final CompetenceRepository competenceRepository;
	private final CompetenceMapper competenceMapper;
	
	
	public CompetenceServiceImp(CompetenceRepository competenceRepository, CompetenceMapper competenceMapper) {
		super();
		this.competenceRepository = competenceRepository;
		this.competenceMapper = competenceMapper;
	}

	@Override
	public CompetenceInfoDTO createCompetence(CompetenceRequest requestDTO) {
		

		Competence competence = competenceMapper.toEntity(requestDTO);
		
		Competence saved = competenceRepository.save(competence);
        
 
        return competenceMapper.toDTO(saved);
		
	}
	
	@Override
	public CompetenceInfoDTO updateCompetence(Long id, CompetenceRequest requestDTO) {
		Competence existing = competenceRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Formation non trouvée avec l'ID: " + id));
	        
	        // Mettre à jour l'entité existante avec les données du DTO
	        competenceMapper.updateEntity(existing, requestDTO);
	        
	        // Sauvegarder
	        Competence updated = competenceRepository.save(existing);
	        
	        // Retourner en DTO
	        return competenceMapper.toDTO(updated);
	}
	@Override
	public void deleteCompetence(Long id) {
		Competence competence = competenceRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("competence non trouvée"));
	        
	        
	        competenceRepository.delete(competence);
	}
	@Override
	public CompetenceInfoDTO getCompetenceById(Long id) {
		Competence competence = competenceRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("competence non trouvée avec l'ID: " + id));
	        
	        return competenceMapper.toDTO(competence);
	}
	@Override
	public CompetenceInfoDTO getCompetenceByCode(String code) {
		Competence competence = competenceRepository.findByCode(code)
	            .orElseThrow(() -> new RuntimeException("competence non trouvée avec le code: " + code));
	        
	        return competenceMapper.toDTO(competence);
	}
	@Override
	public List<CompetenceInfoDTO> getAllCompetences(){
		List<Competence> competences = competenceRepository.findAll();
        return competenceMapper.toDTOList(competences);
		
	}

}

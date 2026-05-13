package com.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.Request.FormationRequest;
import com.example.demo.DTO.Response.FormationAdminDTO;
import com.example.demo.Entity.Formation;
import com.example.demo.Mapper.FormationMapper;
import com.example.demo.Repository.FormationRepository;
import com.example.demo.Repository.SessionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FormationServiceImp implements FormationService{
	private final FormationRepository formationRepository;
    private final FormationMapper formationMapper; // Ajoutez cet inject
    private final SessionRepository sessionRepository;
    
    public FormationServiceImp(FormationRepository formationRepository, FormationMapper formationMapper,SessionRepository sessionRepository) {
		this.formationRepository = formationRepository;
		this.formationMapper = formationMapper;
		this.sessionRepository = sessionRepository;
	}

    
	


	@Override
    public FormationAdminDTO createFormation(FormationRequest requestDTO) {
        // Validation
       /* if (requestDTO.getCode() == null || requestDTO.getCode().trim().isEmpty()) {
            throw new IllegalArgumentException("Le code de la formation est obligatoire");
        }
        
        if (formationRepository.existsByCode(requestDTO.getCode())) {
            throw new IllegalArgumentException("Une formation avec ce code existe déjà");
        }
        */
        // Convertir DTO → Entity
        Formation formation = formationMapper.toEntity(requestDTO);
        
        // Valeurs par défaut (si non présentes dans le DTO)
        if (formation.getActif() == null) {
            formation.setActif(true);
        }
        if (formation.getVersion() == null) {
            formation.setVersion("1.0");
        }
        
        // Sauvegarder
        Formation saved = formationRepository.save(formation);
        
        // Convertir Entity → DTO pour la réponse
        return formationMapper.toDTO(saved);
    }
    
    // === MISE À JOUR avec DTO ===
    @Override
    public FormationAdminDTO updateFormation(Long id, FormationRequest requestDTO) {
        Formation existing = formationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Formation non trouvée avec l'ID: " + id));
        
        // Mettre à jour l'entité existante avec les données du DTO
        formationMapper.updateEntity(existing, requestDTO);
        
        // Sauvegarder
        Formation updated = formationRepository.save(existing);
        
        // Retourner en DTO
        return formationMapper.toDTO(updated);
    }
    
    // === SUPPRESSION (inchangée) ===
    @Override
    public void deleteFormation(Long id) {
        Formation formation = formationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Formation non trouvée"));
        
        if (!formation.getSessions().isEmpty()) {
            throw new IllegalStateException("Impossible de supprimer une formation avec des sessions");
        }
        
        formation.setArchive(true);
        formationRepository.save(formation);
        
    }
    
    // === RÉCUPÉRATION par ID (retourne DTO) ===
    @Override
    public FormationAdminDTO getFormationById(Long id) {
        Formation formation = formationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Formation non trouvée avec l'ID: " + id));
        
        return formationMapper.toDTO(formation);
    }
    
    // === RÉCUPÉRATION par Code (retourne DTO) ===
    @Override
    public FormationAdminDTO getFormationByCode(String code) {
        Formation formation = formationRepository.findByCode(code)
            .orElseThrow(() -> new RuntimeException("Formation non trouvée avec le code: " + code));
        
        return formationMapper.toDTO(formation);
    }
    
    // === TOUTES LES FORMATIONS (retourne Liste de DTOs) ===
    @Override
    public List<FormationAdminDTO> getAllFormations() {
        List<Formation> formations = formationRepository.findByArchiveFalse();
        return formationMapper.toDTOList(formations);
    }
    
    // === FORMATIONS ACTIVES (retourne Liste de DTOs) ===
    @Override
    public List<FormationAdminDTO> getActiveFormations() {
        List<Formation> formations = formationRepository.findByActifTrue();
        return formationMapper.toDTOList(formations);
    }
    
    // === RECHERCHE par Titre (retourne Liste de DTOs) ===
    @Override
    public List<FormationAdminDTO> searchFormationsByTitle(String keyword) {
        List<Formation> formations = formationRepository.findByTitreContainingIgnoreCase(keyword);
        return formationMapper.toDTOList(formations);
    }
    
    // === TOGGLE ACTIF ===
    @Override
    public FormationAdminDTO toggleFormationActif(Long id) {
        Formation formation = formationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Formation non trouvée avec l'ID: " + id));
        
        formation.setActif(!formation.getActif());
        Formation updated = formationRepository.save(formation);
        
        return formationMapper.toDTO(updated);
    }
    
    // === MÉTHODE OPTIONNELLE pour récupérer l'entité (si besoin interne) ===
    public Formation getFormationEntityById(Long id) {
        return formationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Formation non trouvée avec l'ID: " + id));
    }
    
   
    

}

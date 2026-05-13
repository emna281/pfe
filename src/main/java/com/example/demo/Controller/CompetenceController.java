package com.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.CompetenceRequest;
import com.example.demo.DTO.Request.FormationRequest;
import com.example.demo.DTO.Response.CompetenceInfoDTO;
import com.example.demo.DTO.Response.FormationAdminDTO;
import com.example.demo.Service.CompetenceService;
import com.example.demo.Service.FormationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/competences")
//@CrossOrigin(origins = "*")
public class CompetenceController {
	private final CompetenceService competenceService;

	public CompetenceController(CompetenceService competenceService) {

		this.competenceService = competenceService;
	}
	
	@PostMapping
	public ResponseEntity<CompetenceInfoDTO>createCompetence(@RequestBody CompetenceRequest request){
		CompetenceInfoDTO created = competenceService.createCompetence(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
		
	}
	@GetMapping("/{id}")
	public ResponseEntity<CompetenceInfoDTO> getCompetenceById(@PathVariable Long id) {
		CompetenceInfoDTO competence = competenceService.getCompetenceById(id);
        return ResponseEntity.ok(competence);
	}

    @GetMapping("/code/{code}")
    public ResponseEntity<CompetenceInfoDTO> getCompetenceByCode(@PathVariable String code) {
    	CompetenceInfoDTO competence = competenceService.getCompetenceByCode(code);
    	return ResponseEntity.ok(competence);
           
    }
    @GetMapping
    public ResponseEntity<List<CompetenceInfoDTO>> getAllFormations() {

    	List<CompetenceInfoDTO> competences;
        
        
    	competences = competenceService.getAllCompetences();
     
        
        return ResponseEntity.ok(competences);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CompetenceInfoDTO> updateCompetence(
            @PathVariable Long id,
            @Valid @RequestBody CompetenceRequest request) {
        
    	CompetenceInfoDTO updated = competenceService.updateCompetence(id, request);
        return ResponseEntity.ok(updated);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompetence(@PathVariable Long id) {
        try {
        	competenceService.deleteCompetence(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
	
}

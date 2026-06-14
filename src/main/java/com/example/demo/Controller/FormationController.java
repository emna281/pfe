package com.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.FormationRequest;
import com.example.demo.DTO.Response.FormationAdminDTO;
import com.example.demo.Entity.Formation;

import com.example.demo.Service.FormationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/formations")
//@CrossOrigin(origins = "*")
public class FormationController {
	private final FormationService formationService;
	
	
	public FormationController(FormationService formationService) {
		this.formationService = formationService;

	}
	
	@PostMapping
	public ResponseEntity<?> createFormation(
	        @RequestBody FormationRequest request) {

	    try {
		FormationAdminDTO created = formationService.createFormation(request);
	    return ResponseEntity.status(HttpStatus.CREATED).body(created);
	    }catch (IllegalArgumentException e) {
          
            return ResponseEntity.badRequest().body(e.getMessage());
        
        } catch (Exception e) {
          
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erreur lors de la création de la formation");
        }
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<FormationAdminDTO> getFormationById(@PathVariable Long id) {
		FormationAdminDTO formation = formationService.getFormationById(id);
        return ResponseEntity.ok(formation);
	}

    @GetMapping("/code/{code}")
    public ResponseEntity<FormationAdminDTO> getFormationByCode(@PathVariable String code) {
    	FormationAdminDTO formation = formationService.getFormationByCode(code);
    	return ResponseEntity.ok(formation);
           
    }
    @GetMapping
    public ResponseEntity<List<FormationAdminDTO>> getActiveFormations() {
        List<FormationAdminDTO> formations = formationService.getActiveFormations();
        return ResponseEntity.ok(formations);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FormationAdminDTO>> searchFormations(
            @RequestParam String keyword) {
        List<FormationAdminDTO> formations = formationService.searchFormationsByTitle(keyword);
        return ResponseEntity.ok(formations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormationAdminDTO> updateFormation(
            @PathVariable Long id,
            @Valid @RequestBody FormationRequest request) {
        
        FormationAdminDTO updated = formationService.updateFormation(id, request);
        return ResponseEntity.ok(updated);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable Long id) {
        try {
            formationService.deleteFormation(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
   
    @PatchMapping("/{id}/toggle-activation")
    public ResponseEntity<FormationAdminDTO> toggleActivation(@PathVariable Long id) {
        FormationAdminDTO updated = formationService.toggleFormationActif(id);
        return ResponseEntity.ok(updated);
    }
    @GetMapping("/all")
    public ResponseEntity<List<FormationAdminDTO>> getAllFormations() {
        List<FormationAdminDTO> formations = formationService.getAllFormations();
        return ResponseEntity.ok(formations);
    }
}

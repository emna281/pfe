package com.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.CodeRemiseRequestDTO;
import com.example.demo.DTO.Response.CodeRemiseResponseDTO;
import com.example.demo.Service.CodeRemiseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/codes-remise")
public class CodeRemiseController {
	private final CodeRemiseService codeRemiseService;

    public CodeRemiseController(CodeRemiseService codeRemiseService) {
        this.codeRemiseService = codeRemiseService;
    }
    @PostMapping
    public ResponseEntity<CodeRemiseResponseDTO> creerCode(
            @Valid @RequestBody CodeRemiseRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(codeRemiseService.creerCode(request));
    }

    @GetMapping
    public ResponseEntity<List<CodeRemiseResponseDTO>> getAllCodes() {
        return ResponseEntity.ok(codeRemiseService.getAllCodes());
    }

    @GetMapping("/apprenant/{apprenantId}")
    public ResponseEntity<List<CodeRemiseResponseDTO>> getCodesByApprenant(
            @PathVariable Long apprenantId) {
        return ResponseEntity.ok(codeRemiseService.getCodesByApprenant(apprenantId));
    }
    @PatchMapping("/{id}/desactiver")
    public ResponseEntity<Void> desactiverCode(@PathVariable Long id) {
        codeRemiseService.desactiverCode(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/appliquer")
    public ResponseEntity<CodeRemiseResponseDTO> appliquerCode(
            @RequestParam Long factureId,
            @RequestParam String code) {
        return ResponseEntity.ok(codeRemiseService.appliquerCode(factureId, code));
    }
 
    @GetMapping("/valider")
    public ResponseEntity<CodeRemiseResponseDTO> validerCode(
            @RequestParam String code,
            @RequestParam Long apprenantId) {
        return ResponseEntity.ok(codeRemiseService.validerCode(code, apprenantId));
    }
}

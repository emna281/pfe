package com.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.FactureRequestDTO;
import com.example.demo.DTO.Response.ApprenantAvecCodeDTO;
import com.example.demo.DTO.Response.FactureResponseDTO;
import com.example.demo.DTO.Response.InscriptionResponseDTO;
import com.example.demo.Enumeration.StatutFacture;
import com.example.demo.Service.ApprenantService;
import com.example.demo.Service.FactureService;
import com.example.demo.Service.InscriptionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/financier")
public class FactureController {
	private final FactureService factureService;
	private final InscriptionService inscriptionService;
	private final ApprenantService apprenantService;
    public FactureController(FactureService factureService,InscriptionService inscriptionService,ApprenantService apprenantService) {
        this.factureService = factureService;
        this.inscriptionService= inscriptionService;
        this.apprenantService=apprenantService;
    }

    @GetMapping("/factures")
    public ResponseEntity<List<FactureResponseDTO>> getAllFactures() {
        return ResponseEntity.ok(factureService.getAllFactures());
    }

    @GetMapping("/factures/archivees")
    public ResponseEntity<List<FactureResponseDTO>> getFacturesArchivees() {
        return ResponseEntity.ok(factureService.getFacturesArchivees());
    }

    @PutMapping("/factures/{id}")
    public ResponseEntity<FactureResponseDTO> updateFacture(
            @PathVariable Long id,
            @RequestBody FactureRequestDTO request) {
        FactureResponseDTO updatedFacture = factureService.updateFacture(id, request);
        return ResponseEntity.ok(updatedFacture);
    }

    @PatchMapping("/factures/{id}/statut")
    public ResponseEntity<FactureResponseDTO> updateStatut(
            @PathVariable Long id,
            @RequestParam StatutFacture statut) {
        FactureResponseDTO updatedFacture = factureService.updateStatut(id, statut);
        return ResponseEntity.ok(updatedFacture);
    }
    @GetMapping("/factures/{id}")
    public ResponseEntity<FactureResponseDTO> getFactureById(@PathVariable Long id) {

        FactureResponseDTO facture = factureService.getFactureById(id);

        return ResponseEntity.ok(facture);
    }
    
    @GetMapping("/inscription/{inscriptionId}")
    public ResponseEntity<FactureResponseDTO> getFactureByInscription(
            @PathVariable Long inscriptionId) {
        return ResponseEntity.ok(
            factureService.getFactureByInscription(inscriptionId)
        );
    }
    @GetMapping("/inscriptions/non-facturees")
    public ResponseEntity<List<InscriptionResponseDTO>> getInscriptionsNonFacturees() {
        List<InscriptionResponseDTO> result = inscriptionService.getInscriptionsNonFacturees();
        if (result.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        return ResponseEntity.ok(result); 
    }

    @PostMapping("/factures")
    public ResponseEntity<FactureResponseDTO> creerFacture(
            @Valid @RequestBody FactureRequestDTO request) {
        FactureResponseDTO facture = factureService.creerFacture(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(facture);
    }
    @GetMapping("/apprenants/avec-codes")
    public ResponseEntity<List<ApprenantAvecCodeDTO>> getApprenantsAvecCodes() {
        return ResponseEntity.ok(apprenantService.getApprenantsAvecCodes());
    }
 // Dans FactureController.java

    @PostMapping("factures/{id}/relancer")
    public ResponseEntity<Void> relancerFacture(@PathVariable Long id) {
        factureService.relancerFacture(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("factures/{id}/alerte")
    public ResponseEntity<Void> envoyerAlerte(@PathVariable Long id) {
        factureService.envoyerAlerte(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("factures/en-retard")
    public ResponseEntity<List<FactureResponseDTO>> getFacturesEnRetard() {
        return ResponseEntity.ok(factureService.getFacturesEnRetard());
    }

    @GetMapping("factures/echeances-proches")
    public ResponseEntity<List<FactureResponseDTO>> getEcheancesProches() {
        return ResponseEntity.ok(factureService.getEcheancesProches());
    }
    @PatchMapping("/factures/{id}/archiver")
    public ResponseEntity<Void> archiverFacture(@PathVariable Long id) {
        factureService.archiverFacture(id);
        return ResponseEntity.noContent().build();
    }
}

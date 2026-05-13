package com.example.demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.Request.CreateUtilisateurRequest;
import com.example.demo.DTO.Response.PagedResponse;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Entity.Utilisateur;
import com.example.demo.Enumeration.RoleUtilisateur;
import com.example.demo.Service.AdminService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/utilisateurs")
    public ResponseEntity<UtilisateurResponse> creerUtilisateur(
        @RequestBody CreateUtilisateurRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(adminService.creerUtilisateur(request));
    }

    @GetMapping("/utilisateurs")
    public ResponseEntity<List<UtilisateurResponse>> getAllUtilisateurs() {
        return ResponseEntity.ok(adminService.getAllUtilisateurs());
    }
    @GetMapping("/utilisateurs/{id}")
    public ResponseEntity<UtilisateurResponse> getUtilisateurById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getUtilisateurById(id));
    }

    @PutMapping("/utilisateurs/{id}/actif")
    public ResponseEntity<Void> toggleActif(@PathVariable Long id) {
        adminService.toggleActif(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/utilisateurs/{id}")
    public ResponseEntity<Void> supprimerUtilisateur(@PathVariable Long id) {
        adminService.supprimerUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/utilisateurs/filtre")
    public ResponseEntity<PagedResponse<UtilisateurResponse>> getFiltre(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean actif,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int limit) {
    	System.out.println(">>> requête reçue, role = " + role);
    	RoleUtilisateur roleEnum = null;
        if (role != null) {
            try {
                roleEnum = RoleUtilisateur.valueOf(role.toUpperCase()); // 
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.ok(
            adminService.getByFilters(roleEnum, search, actif, page, limit)
        );
    }
    @PutMapping("/utilisateurs/{id}")
    public ResponseEntity<?> updateUtilisateur(
            @PathVariable Long id,
            @RequestBody CreateUtilisateurRequest request) {

        UtilisateurResponse utilisateur = adminService.updateUtilisateur(id, request);
        return ResponseEntity.ok(utilisateur);
    }
    @PostMapping("/utilisateurs/{id}/cv")
    public ResponseEntity<?> uploadCv(
        @PathVariable Long id,
        @RequestParam("cv") MultipartFile file) {
        try {
            String path = adminService.sauvegarderCv(id, file);
            return ResponseEntity.ok(Map.of("cvPath", path));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur upload CV : " + e.getMessage());
        }
    }
}
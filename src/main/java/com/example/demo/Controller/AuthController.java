package com.example.demo.Controller;

import javax.naming.AuthenticationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.LoginRequest;
import com.example.demo.DTO.Request.SignupApprenantRequest;
import com.example.demo.DTO.Response.LoginResponse;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.Utilisateur;
import com.example.demo.Enumeration.RoleUtilisateur;
import com.example.demo.Enumeration.statusApprenant;
import com.example.demo.Repository.ApprenantRepository;
import com.example.demo.Repository.UtilisateurRepository;
import com.example.demo.Security.JwtUtil;
import com.example.demo.Service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
	private final AuthService authService;
	

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
	
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    @PostMapping("/signup/apprenant")
    public ResponseEntity<?> signupApprenant(
            @Valid @RequestBody SignupApprenantRequest request) {
        try {
            LoginResponse response = authService.signupApprenant(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        try {
            LoginResponse response = authService.getCurrentUser(
                request.getHeader("Authorization")
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    
}

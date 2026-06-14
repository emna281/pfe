package com.example.demo.Service;

import com.example.demo.DTO.Request.CreateUtilisateurRequest;
import com.example.demo.DTO.Request.LoginRequest;
import com.example.demo.DTO.Request.SignupApprenantRequest;
import com.example.demo.DTO.Response.LoginResponse;
import com.example.demo.DTO.Response.UtilisateurResponse;

public interface AuthService {
	LoginResponse login(LoginRequest request);
    LoginResponse signupApprenant(SignupApprenantRequest request);
    LoginResponse getCurrentUser(String authHeader);
    
}

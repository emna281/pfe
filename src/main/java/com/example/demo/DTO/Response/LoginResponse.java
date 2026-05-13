package com.example.demo.DTO.Response;

public class LoginResponse {
	private String token;
    private String role;
    private String nom;
    private String prenom;
    private String email;
    private Long id;

    public LoginResponse(String token, String role, String nom,
                         String prenom, String email, Long id) {
        this.token = token;
        this.role = role;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.id = id;
    }

    public String getToken() { return token; }
    public String getRole() { return role; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public String getEmail() { return email; }
    public Long getId() { return id; }
}

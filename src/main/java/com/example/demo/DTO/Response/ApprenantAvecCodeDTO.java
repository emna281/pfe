package com.example.demo.DTO.Response;

import java.time.LocalDateTime;

public class ApprenantAvecCodeDTO {
	private Long id;
    private String nom, prenom, email, telephone;
    private LocalDateTime dateCreation;
    private CodeRemiseInfoDTO codeRemiseActif;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public LocalDateTime getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(LocalDateTime dateCreation) {
		this.dateCreation = dateCreation;
	}
	public CodeRemiseInfoDTO getCodeRemiseActif() {
		return codeRemiseActif;
	}
	public void setCodeRemiseActif(CodeRemiseInfoDTO codeRemiseActif) {
		this.codeRemiseActif = codeRemiseActif;
	}
    
}

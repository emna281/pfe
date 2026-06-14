package com.example.demo.DTO.Request;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enumeration.RoleUtilisateur;

public class CreateUtilisateurRequest {
	private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private RoleUtilisateur role;
    private String specialite;
    private Integer anneesExperience;
    private String cvPath;
    private List<String> competenceNoms = new ArrayList<>();

    public List<String> getCompetenceNoms() { return competenceNoms; }
    public void setCompetenceNoms(List<String> competenceNoms) { this.competenceNoms = competenceNoms; }
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
	public RoleUtilisateur getRole() {
		return role;
	}
	public void setRole(RoleUtilisateur role) {
		this.role = role;
	}
	public String getSpecialite() {
		return specialite;
	}
	public void setSpecialite(String specialite) {
		this.specialite = specialite;
	}
	public Integer getAnneesExperience() {
		return anneesExperience;
	}
	public void setAnneesExperience(Integer anneesExperience) {
		this.anneesExperience = anneesExperience;
	}
	public String getCvPath() {
		return cvPath;
	}
	public void setCvPath(String cvPath) {
		this.cvPath = cvPath;
	}
    
    

}

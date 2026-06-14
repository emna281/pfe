package com.example.demo.DTO.Response;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enumeration.RoleUtilisateur;

public class UtilisateurResponse {
	private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private RoleUtilisateur role;
    private Boolean actif;
    private String specialite;
    private Integer anneesExperience;
    private String cvPath;
    private String posteActuel;
    private String niveauEtude;
    private Long numeroEnregistrement;
    private String dateCreation;
    private List<String> competences = new ArrayList<>();

    public List<String> getCompetences() { return competences; }
    public void setCompetences(List<String> competences) { this.competences = competences; }
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
	public RoleUtilisateur getRole() {
		return role;
	}
	public void setRole(RoleUtilisateur role) {
		this.role = role;
	}
	public Boolean getActif() {
		return actif;
	}
	public void setActif(Boolean actif) {
		this.actif = actif;
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
	public String getPosteActuel() {
		return posteActuel;
	}
	public void setPosteActuel(String posteActuel) {
		this.posteActuel = posteActuel;
	}
	public String getNiveauEtude() {
		return niveauEtude;
	}
	public void setNiveauEtude(String niveauEtude) {
		this.niveauEtude = niveauEtude;
	}
	public Long getNumeroEnregistrement() {
		return numeroEnregistrement;
	}
	public void setNumeroEnregistrement(Long numeroEnregistrement) {
		this.numeroEnregistrement = numeroEnregistrement;
	}
	public String getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(String dateCreation) {
		this.dateCreation = dateCreation;
	}
    
    

}

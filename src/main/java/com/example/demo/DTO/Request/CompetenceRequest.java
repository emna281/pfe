package com.example.demo.DTO.Request;

import com.example.demo.Enumeration.CategorieCompetence;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;

public class CompetenceRequest {
	@NotBlank(message = "Le code est obligatoire")
    private String code; 
	@NotBlank(message = "Le nom est obligatoire")
    private String nom;
    
    private String description;
    
    private CategorieCompetence categorie;

	public CompetenceRequest(@NotBlank(message = "Le code est obligatoire") String code,
			@NotBlank(message = "Le nom est obligatoire") String nom, String description,
			CategorieCompetence categorie) {
		super();
		this.code = code;
		this.nom = nom;
		this.description = description;
		this.categorie = categorie;
	}

	public CompetenceRequest() {}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public CategorieCompetence getCategorie() {
		return categorie;
	}

	public void setCategorie(CategorieCompetence categorie) {
		this.categorie = categorie;
	}
	
	


    
}

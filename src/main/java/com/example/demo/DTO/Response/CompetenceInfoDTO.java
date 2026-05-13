package com.example.demo.DTO.Response;

import java.util.List;

import com.example.demo.Entity.Formation;
import com.example.demo.Enumeration.CategorieCompetence;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class CompetenceInfoDTO {
	private Long id;
    private String code; 
    private String nom;
    private String description;
    private CategorieCompetence categorie;
    private List<String> formationCodes;
	
    public CompetenceInfoDTO() {}
	
	public CompetenceInfoDTO(Long id, String code, String nom, String description,
			CategorieCompetence categorie) {
		super();
		this.id = id;
		this.code = code;
		this.nom = nom;
		this.description = description;
		this.categorie = categorie;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public List<String> getFormationCodes() {
		return formationCodes;
	}

	public void setFormationCodes(List<String> formationCodes) {
		this.formationCodes = formationCodes;
	}
    
	

	

}

package com.example.demo.DTO.Request;

import java.util.List;
import java.util.Objects;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class FormationRequest {
	
    private String code;
    
    @NotBlank(message = "Le titre est obligatoire")
    private String titre;
    
    private String description;
    
    @NotNull(message = "La durée est obligatoire")
    @Positive(message = "La durée doit être positive")
    private Integer dureeHeures;
    
    @NotNull(message = "La durée est obligatoire")
    private Integer dureeJours;
    
    @NotNull(message = "Le prix est obligatoire")
    @Positive(message = "Le prix doit être positif")
    private Double prixPublic;
    
    private Boolean actif = true;
    private String version = "1.0";
    private List<String> competenceNoms;
	public FormationRequest() {}
	public FormationRequest(@NotBlank(message = "Le code est obligatoire") String code,
			@NotBlank(message = "Le titre est obligatoire") String titre, String description,
			@NotNull(message = "La durée est obligatoire") @Positive(message = "La durée doit être positive") Integer dureeHeures,
			@NotNull(message = "Le prix est obligatoire") @Positive(message = "Le prix doit être positif") Double prixPublic,
			Boolean actif, String version,List<String> competenceNoms,@NotNull(message = "La durée est obligatoire") Integer dureeJours) {
		super();
		this.code = code;
		this.titre = titre;
		this.description = description;
		this.dureeHeures = dureeHeures;
		this.prixPublic = prixPublic;
		this.actif = actif;
		this.version = version;
		this.competenceNoms = competenceNoms;
		this.dureeJours = dureeJours;
	}
	
	public List<String> getCompetenceNoms() {
		return competenceNoms;
	}
	public void setCompetenceNoms(List<String> competenceNoms) {
		this.competenceNoms = competenceNoms;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getDureeHeures() {
		return dureeHeures;
	}
	public void setDureeHeures(Integer dureeHeures) {
		this.dureeHeures = dureeHeures;
	}
	public Double getPrixPublic() {
		return prixPublic;
	}
	public void setPrixPublic(Double prixPublic) {
		this.prixPublic = prixPublic;
	}
	public Boolean getActif() {
		return actif;
	}
	public void setActif(Boolean actif) {
		this.actif = actif;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public Integer getDureeJours() {
		return dureeJours;
	}
	public void setDureeJours(Integer dureeJours) {
		this.dureeJours = dureeJours;
	}
    
    
}

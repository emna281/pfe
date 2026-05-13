package com.example.demo.DTO.Request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class SessionRequest {
	@NotBlank(message = "Le nom est obligatoire")
    @Size(min = 3, max = 100, message = "Le nom doit contenir entre 3 et 100 caractères")
    private String nom;
    
    @NotNull(message = "La date de début est obligatoire")
    private LocalDate dateDebut;
    
    @NotNull(message = "La date de fin est obligatoire")
    private LocalDate dateFin;
    
    private LocalTime heureDebut;
    private LocalTime heureFin;
    
    private BigDecimal prix;
    //@NotNull(message = "Le nombre de places est obligatoire")
    //@Min(value = 1, message = "Le nombre de places doit être au moins 1")
    //@Max(value = 100, message = "Le nombre de places ne peut pas dépasser 100")
    private Integer placesMax;
    
    private Long formateurId;
    public BigDecimal getPrix() {
		return prix;
	}

	public void setPrix(BigDecimal prix) {
		this.prix = prix;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	private String lieu;
    private String lienVisio;
    private String materielRequis;
    
    //@NotBlank(message = "Le mode est obligatoire (PRESENTIEL ou DISTANCIEL)")
    private String mode;
    
    @NotBlank(message = "Le code de la formation est obligatoire")
    private String formationCode;

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public LocalDate getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(LocalDate dateDebut) {
		this.dateDebut = dateDebut;
	}

	public LocalDate getDateFin() {
		return dateFin;
	}

	public void setDateFin(LocalDate dateFin) {
		this.dateFin = dateFin;
	}

	public LocalTime getHeureDebut() {
		return heureDebut;
	}

	public void setHeureDebut(LocalTime heureDebut) {
		this.heureDebut = heureDebut;
	}

	public LocalTime getHeureFin() {
		return heureFin;
	}

	public void setHeureFin(LocalTime heureFin) {
		this.heureFin = heureFin;
	}

	public Integer getPlacesMax() {
		return placesMax;
	}

	public void setPlacesMax(Integer placesMax) {
		this.placesMax = placesMax;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public String getLienVisio() {
		return lienVisio;
	}

	public void setLienVisio(String lienVisio) {
		this.lienVisio = lienVisio;
	}

	public String getMaterielRequis() {
		return materielRequis;
	}

	public void setMaterielRequis(String materielRequis) {
		this.materielRequis = materielRequis;
	}

	public String getFormationCode() {
		return formationCode;
	}

	public void setFormationCode(String formationCode) {
		this.formationCode = formationCode;
	}

	public Long getFormateurId() { return formateurId; }
	public void setFormateurId(Long formateurId) { this.formateurId = formateurId; }

	public SessionRequest() {}
    
    

}

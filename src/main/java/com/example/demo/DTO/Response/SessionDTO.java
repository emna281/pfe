package com.example.demo.DTO.Response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;



public class SessionDTO {
	private Long id;
    private String code;
    private String nom;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private Integer placesMax;
    private Integer placesRestantes;
    private String statut;
    private String mode;
    private String lieu;
    private String lienVisio;
    private String materielRequis;
    private BigDecimal prix;
    private String  formationCode;
    private String formationNom;
    private Long formateurId;
    private String formateurNom;
    private Long salleCode;
    private String salleNom;
    private List<Long> inscriptionIds;
    private Integer nombrePresences;
    private List<Long> factureIds;
    private List<Long> chargeIds;
	public SessionDTO() {}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public BigDecimal getPrix() {
		return prix;
	}
	public void setPrix(BigDecimal prix) {
		this.prix = prix;
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
	public Integer getPlacesRestantes() {
		return placesRestantes;
	}
	public void setPlacesRestantes(Integer placesRestantes) {
		this.placesRestantes = placesRestantes;
	}
	public String getStatut() {
		return statut;
	}
	public void setStatut(String statut) {
		this.statut = statut;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
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
	public String getFormationNom() {
		return formationNom;
	}
	public void setFormationNom(String formationNom) {
		this.formationNom = formationNom;
	}
	public Long getFormateurId() {
		return formateurId;
	}
	public void setFormateurId(Long formateurId) {
		this.formateurId = formateurId;
	}
	public String getFormateurNom() {
		return formateurNom;
	}
	public void setFormateurNom(String formateurNom) {
		this.formateurNom = formateurNom;
	}
	public Long getSalleCode() {
		return salleCode;
	}
	public void setSalleCode(Long salleCode) {
		this.salleCode = salleCode;
	}
	public String getSalleNom() {
		return salleNom;
	}
	public void setSalleNom(String salleNom) {
		this.salleNom = salleNom;
	}
	public List<Long> getInscriptionIds() {
		return inscriptionIds;
	}
	public void setInscriptionIds(List<Long> inscriptionIds) {
		this.inscriptionIds = inscriptionIds;
	}
	public Integer getNombrePresences() {
		return nombrePresences;
	}
	public void setNombrePresences(Integer nombrePresences) {
		this.nombrePresences = nombrePresences;
	}
	public List<Long> getFactureIds() {
		return factureIds;
	}
	public void setFactureIds(List<Long> factureIds) {
		this.factureIds = factureIds;
	}
	public List<Long> getChargeIds() {
		return chargeIds;
	}
	public void setChargeIds(List<Long> chargeIds) {
		this.chargeIds = chargeIds;
	}
	
}
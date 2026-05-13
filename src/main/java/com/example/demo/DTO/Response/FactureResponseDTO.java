package com.example.demo.DTO.Response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


import com.example.demo.Enumeration.StatutFacture;

public class FactureResponseDTO {
	
	
	private Long id;
    private String numeroFacture;
    private LocalDate dateEmission;
    private LocalDate dateEcheance;
    private StatutFacture statut;
    private BigDecimal montantHT;
    private BigDecimal montantTVA;
    private BigDecimal montantTTC;
    private BigDecimal remise;
    private String notes;
	private Long inscriptionId;
	private Long apprenantId;
    private String apprenantNom;
    private String apprenantPrenom;
    private String apprenantEmail;
    private Long sessionId;
    private String sessionNom;
    private String formationTitre;


    private List<PaiementDTO> paiements;

    private BigDecimal montantPaye;
    private BigDecimal montantRestant;
	public FactureResponseDTO() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNumeroFacture() {
		return numeroFacture;
	}
	public void setNumeroFacture(String numeroFacture) {
		this.numeroFacture = numeroFacture;
	}
	public LocalDate getDateEmission() {
		return dateEmission;
	}
	public void setDateEmission(LocalDate dateEmission) {
		this.dateEmission = dateEmission;
	}
	public LocalDate getDateEcheance() {
		return dateEcheance;
	}
	public void setDateEcheance(LocalDate dateEcheance) {
		this.dateEcheance = dateEcheance;
	}
	public StatutFacture getStatut() {
		return statut;
	}
	public void setStatut(StatutFacture statut) {
		this.statut = statut;
	}
	public BigDecimal getMontantHT() {
		return montantHT;
	}
	public void setMontantHT(BigDecimal montantHT) {
		this.montantHT = montantHT;
	}
	public BigDecimal getMontantTVA() {
		return montantTVA;
	}
	public void setMontantTVA(BigDecimal montantTVA) {
		this.montantTVA = montantTVA;
	}
	public BigDecimal getMontantTTC() {
		return montantTTC;
	}
	public void setMontantTTC(BigDecimal montantTTC) {
		this.montantTTC = montantTTC;
	}
	public BigDecimal getRemise() {
		return remise;
	}
	public void setRemise(BigDecimal remise) {
		this.remise = remise;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public Long getInscriptionId() {
		return inscriptionId;
	}
	public void setInscriptionId(Long inscriptionId) {
		this.inscriptionId = inscriptionId;
	}
	public String getApprenantNom() {
		return apprenantNom;
	}
	public void setApprenantNom(String apprenantNom) {
		this.apprenantNom = apprenantNom;
	}
	public String getApprenantPrenom() {
		return apprenantPrenom;
	}
	public void setApprenantPrenom(String apprenantPrenom) {
		this.apprenantPrenom = apprenantPrenom;
	}
	public String getApprenantEmail() {
		return apprenantEmail;
	}
	public void setApprenantEmail(String apprenantEmail) {
		this.apprenantEmail = apprenantEmail;
	}
	public Long getSessionId() {
		return sessionId;
	}
	public void setSessionId(Long sessionId) {
		this.sessionId = sessionId;
	}
	public String getSessionNom() {
		return sessionNom;
	}
	public void setSessionNom(String sessionNom) {
		this.sessionNom = sessionNom;
	}
	public String getFormationTitre() {
		return formationTitre;
	}
	public void setFormationTitre(String formationTitre) {
		this.formationTitre = formationTitre;
	}
	public List<PaiementDTO> getPaiements() {
		return paiements;
	}
	public void setPaiements(List<PaiementDTO> paiements) {
		this.paiements = paiements;
	}
	public BigDecimal getMontantPaye() {
		return montantPaye;
	}
	public void setMontantPaye(BigDecimal montantPaye) {
		this.montantPaye = montantPaye;
	}
	public BigDecimal getMontantRestant() {
		return montantRestant;
	}
	public void setMontantRestant(BigDecimal montantRestant) {
		this.montantRestant = montantRestant;
	}
	public Long getApprenantId() {
		return apprenantId;
	}
	public void setApprenantId(Long apprenantId) {
		this.apprenantId = apprenantId;
	}
    
	 

}

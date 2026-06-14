package com.example.demo.DTO.Response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.demo.Enumeration.StatutInscription;

public class InscriptionResponseDTO {
	private Long id;
    private LocalDateTime dateInscription;
    private StatutInscription statut;
    private Integer noteFormateur;
    private Integer noteFormation;

    private String apprenantNom;
    private String apprenantPrenom;
    private String apprenantEmail;

    private String sessionNom;
    private String sessionCode;

    private String numeroFacture;
    private String statutFacture;
    
    private BigDecimal prixSession;

    public InscriptionResponseDTO() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(LocalDateTime dateInscription) {
		this.dateInscription = dateInscription;
	}

	public StatutInscription getStatut() {
		return statut;
	}

	public void setStatut(StatutInscription statut) {
		this.statut = statut;
	}

	public Integer getNoteFormateur() {
		return noteFormateur;
	}

	public void setNoteFormateur(Integer noteFormateur) {
		this.noteFormateur = noteFormateur;
	}

	public Integer getNoteFormation() {
		return noteFormation;
	}

	public void setNoteFormation(Integer noteFormation) {
		this.noteFormation = noteFormation;
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

	public String getSessionNom() {
		return sessionNom;
	}

	public void setSessionNom(String sessionNom) {
		this.sessionNom = sessionNom;
	}

	public String getSessionCode() {
		return sessionCode;
	}

	public void setSessionCode(String sessionCode) {
		this.sessionCode = sessionCode;
	}

	public String getNumeroFacture() {
		return numeroFacture;
	}

	public void setNumeroFacture(String numeroFacture) {
		this.numeroFacture = numeroFacture;
	}

	public String getStatutFacture() {
		return statutFacture;
	}

	public void setStatutFacture(String statutFacture) {
		this.statutFacture = statutFacture;
	}

	public BigDecimal getPrixSession() {
		return prixSession;
	}

	public void setPrixSession(BigDecimal prixSession) {
		this.prixSession = prixSession;
	}

	

}

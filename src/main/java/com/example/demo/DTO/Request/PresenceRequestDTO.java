package com.example.demo.DTO.Request;

import com.example.demo.Enumeration.StatutPresence;

public class PresenceRequestDTO {
	private Long inscriptionId;
    private Integer jourNumero;         
    private StatutPresence statut;       
    private String commentaireFormateur; 
    private String justificatifAbsence;
	public PresenceRequestDTO() {}
	public Long getInscriptionId() {
		return inscriptionId;
	}
	public void setInscriptionId(Long inscriptionId) {
		this.inscriptionId = inscriptionId;
	}
	public Integer getJourNumero() {
		return jourNumero;
	}
	public void setJourNumero(Integer jourNumero) {
		this.jourNumero = jourNumero;
	}
	public StatutPresence getStatut() {
		return statut;
	}
	public void setStatut(StatutPresence statut) {
		this.statut = statut;
	}
	public String getCommentaireFormateur() {
		return commentaireFormateur;
	}
	public void setCommentaireFormateur(String commentaireFormateur) {
		this.commentaireFormateur = commentaireFormateur;
	}
	public String getJustificatifAbsence() {
		return justificatifAbsence;
	}
	public void setJustificatifAbsence(String justificatifAbsence) {
		this.justificatifAbsence = justificatifAbsence;
	} 
	
    
}

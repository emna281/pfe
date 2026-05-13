package com.example.demo.DTO.Response;

import com.example.demo.Enumeration.StatutPresence;

public class PresenceResponseDTO {
	private Long id;
    private Integer jourNumero;
    private String jourLabel;      
    private StatutPresence statut;
    private Long inscriptionId;
    private String nomApprenant;
    private String prenomApprenant;
    private Boolean valideParFormateur;
    private String commentaireFormateur;
    private String justificatifAbsence;
	public PresenceResponseDTO() {}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getJourNumero() {
		return jourNumero;
	}
	public void setJourNumero(Integer jourNumero) {
		this.jourNumero = jourNumero;
	}
	public String getJourLabel() {
		return jourLabel;
	}
	public void setJourLabel(String jourLabel) {
		this.jourLabel = jourLabel;
	}
	public StatutPresence getStatut() {
		return statut;
	}
	public void setStatut(StatutPresence statut) {
		this.statut = statut;
	}
	public Long getInscriptionId() {
		return inscriptionId;
	}
	public void setInscriptionId(Long inscriptionId) {
		this.inscriptionId = inscriptionId;
	}
	public String getNomApprenant() {
		return nomApprenant;
	}
	public void setNomApprenant(String nomApprenant) {
		this.nomApprenant = nomApprenant;
	}
	public String getPrenomApprenant() {
		return prenomApprenant;
	}
	public void setPrenomApprenant(String prenomApprenant) {
		this.prenomApprenant = prenomApprenant;
	}
	public Boolean getValideParFormateur() {
		return valideParFormateur;
	}
	public void setValideParFormateur(Boolean valideParFormateur) {
		this.valideParFormateur = valideParFormateur;
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

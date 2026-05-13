package com.example.demo.DTO.Response;

import java.util.List;

public class TableauPresenceResponseDTO {
	 private Long sessionId;
	 private String nomFormation;
	 private Integer dureeJours;      
	 private List<String> joursLabels;   
	 private List<LignePresenceResponseDTO> lignes;
	public TableauPresenceResponseDTO() {}
	public Long getSessionId() {
		return sessionId;
	}
	public void setSessionId(Long sessionId) {
		this.sessionId = sessionId;
	}
	public String getNomFormation() {
		return nomFormation;
	}
	public void setNomFormation(String nomFormation) {
		this.nomFormation = nomFormation;
	}
	public Integer getDureeJours() {
		return dureeJours;
	}
	public void setDureeJours(Integer dureeJours) {
		this.dureeJours = dureeJours;
	}
	public List<String> getJoursLabels() {
		return joursLabels;
	}
	public void setJoursLabels(List<String> joursLabels) {
		this.joursLabels = joursLabels;
	}
	public List<LignePresenceResponseDTO> getLignes() {
		return lignes;
	}
	public void setLignes(List<LignePresenceResponseDTO> lignes) {
		this.lignes = lignes;
	}
	 
	 

}

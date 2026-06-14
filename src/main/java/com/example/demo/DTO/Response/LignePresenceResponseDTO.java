package com.example.demo.DTO.Response;

import java.util.LinkedHashMap;
import java.util.Map;

public class LignePresenceResponseDTO {
	private Long inscriptionId;
    private Long apprenantId;
    private String nomApprenant;
    private String prenomApprenant;
    private Map<Integer, PresenceResponseDTO> presencesParJour = new LinkedHashMap<>();
	public LignePresenceResponseDTO() {}
	public Long getInscriptionId() {
		return inscriptionId;
	}
	public void setInscriptionId(Long inscriptionId) {
		this.inscriptionId = inscriptionId;
	}
	public Long getApprenantId() {
		return apprenantId;
	}
	public void setApprenantId(Long apprenantId) {
		this.apprenantId = apprenantId;
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
	public Map<Integer, PresenceResponseDTO> getPresencesParJour() {
		return presencesParJour;
	}
	public void setPresencesParJour(Map<Integer, PresenceResponseDTO> presencesParJour) {
		this.presencesParJour = presencesParJour;
	}
	
    
}

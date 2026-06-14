package com.example.demo.DTO.Response;

import com.example.demo.Enumeration.Evaluation;

public class noteResponse {
	
	private Long id;
	
	private Long note;
	
	private Boolean reusit;
	
	private Evaluation evaluation;
	
	private Long inscriptionId;
	
    private String nomApprenant;
    
    private String prenomApprenant;

	public noteResponse() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getNote() {
		return note;
	}

	public void setNote(Long note) {
		this.note = note;
	}

	public Boolean getReusit() {
		return reusit;
	}

	public void setReusit(Boolean reusit) {
		this.reusit = reusit;
	}

	public Evaluation getEvaluation() {
		return evaluation;
	}

	public void setEvaluation(Evaluation evaluation) {
		this.evaluation = evaluation;
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

	
	
	
	

}

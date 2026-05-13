package com.example.demo.DTO.Response;

import java.time.LocalDate;

import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.StatutCharge;
import com.example.demo.Enumeration.TypeCharge;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class ChargeResponse {
	
	private Long id;
    private String numeroCharge;  
    private TypeCharge type;
    private StatutCharge statut;
    private String description;
    private LocalDate dateCharge;    
    private String periode;  
    private Double montant;
    
    private String justificatifPath; 
    private Long sessionId;
    private String sessionNom;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNumeroCharge() {
		return numeroCharge;
	}
	public void setNumeroCharge(String numeroCharge) {
		this.numeroCharge = numeroCharge;
	}
	public TypeCharge getType() {
		return type;
	}
	public void setType(TypeCharge type) {
		this.type = type;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public LocalDate getDateCharge() {
		return dateCharge;
	}
	public void setDateCharge(LocalDate dateCharge) {
		this.dateCharge = dateCharge;
	}
	public String getPeriode() {
		return periode;
	}
	public void setPeriode(String periode) {
		this.periode = periode;
	}
	public Double getMontant() {
		return montant;
	}
	public void setMontant(Double montant) {
		this.montant = montant;
	}

	public String getJustificatifPath() {
		return justificatifPath;
	}
	public void setJustificatifPath(String justificatifPath) {
		this.justificatifPath = justificatifPath;
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
	public StatutCharge getStatut() {
		return statut;
	}
	public void setStatut(StatutCharge statut) {
		this.statut = statut;
	}
    

}

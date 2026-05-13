package com.example.demo.DTO.Request;

import java.time.LocalDate;

import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.TypeCharge;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class ChargeRequest {

    private String numeroCharge;  
    private TypeCharge type;
    private String description;
    private LocalDate dateCharge;
    
    private String periode;  
    private Double montant;

    
    private String justificatifPath; 
    private Long sessionId;
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
    
    
}

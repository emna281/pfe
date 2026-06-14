package com.example.demo.DTO.Request;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PaiementRequestDTO {
	private LocalDate datePaiement;
    private BigDecimal montant;
    private String modePaiement;
    private String codeRemise;
	public PaiementRequestDTO() {}
	public LocalDate getDatePaiement() {
		return datePaiement;
	}
	public void setDatePaiement(LocalDate datePaiement) {
		this.datePaiement = datePaiement;
	}
	public BigDecimal getMontant() {
		return montant;
	}
	public void setMontant(BigDecimal montant) {
		this.montant = montant;
	}
	public String getModePaiement() {
		return modePaiement;
	}
	public void setModePaiement(String modePaiement) {
		this.modePaiement = modePaiement;
	}
	public String getCodeRemise() {
		return codeRemise;
	}
	public void setCodeRemise(String codeRemise) {
		this.codeRemise = codeRemise;
	}
	
    
}

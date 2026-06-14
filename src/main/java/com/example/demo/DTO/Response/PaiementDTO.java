package com.example.demo.DTO.Response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PaiementDTO {
	private Long id;
    private LocalDate datePaiement;
    private BigDecimal montant;
    private String modePaiement;
	public PaiementDTO() {}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
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
    
    

}

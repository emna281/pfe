package com.example.demo.DTO.Request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.example.demo.Enumeration.StatutFacture;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class FactureRequestDTO {
	@FutureOrPresent(message = "La date d'échéance doit être dans le futur")
    private LocalDate dateEcheance;
 
    @Size(max = 500, message = "Les notes ne peuvent pas dépasser 500 caractères")
    private String notes;
    
    private StatutFacture statut;
    
    @NotNull(message = "L'ID de l'inscription est obligatoire")
    private Long inscriptionId;
    
    

	public FactureRequestDTO() {

	}

	public LocalDate getDateEcheance() {
		return dateEcheance;
	}

	public void setDateEcheance(LocalDate dateEcheance) {
		this.dateEcheance = dateEcheance;
	}



	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Long getInscriptionId() {
		return inscriptionId;
	}

	public void setInscriptionId(Long inscriptionId) {
		this.inscriptionId = inscriptionId;
	}

	
    
    

}

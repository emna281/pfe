package com.example.demo.Entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enumeration.StatutFacture;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "factures")
public class Facture {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String numeroFacture;
    
    @Column(nullable = false)
    private LocalDate dateEmission;
    
    private LocalDate dateEcheance;
    
    @Enumerated(EnumType.STRING)

    private StatutFacture statut = StatutFacture.EMISE;
    
    private BigDecimal  montantHT;
    private BigDecimal  montantTVA;
    private BigDecimal  montantTTC;
    private BigDecimal  remise;
    
    private String notes;
    
   
    
    @OneToOne
    @JoinColumn(name = "inscription_id", nullable = false)
    private Inscription inscription;
    
  
    
    @OneToMany(mappedBy = "facture", cascade = CascadeType.ALL)
    private List<Paiement> paiements = new ArrayList<>();

    @Column(nullable = false)
    private boolean archive = false;
    
    public Facture() {}
    
    
   

	public Facture(Long id, String numeroFacture, LocalDate dateEmission, LocalDate dateEcheance, StatutFacture statut,
			BigDecimal montantHT, BigDecimal montantTVA, BigDecimal montantTTC, BigDecimal remise, String notes,
			Inscription inscription, List<Paiement> paiements,boolean archive) {
		super();
		this.id = id;
		this.numeroFacture = numeroFacture;
		this.dateEmission = dateEmission;
		this.dateEcheance = dateEcheance;
		this.statut = statut;
		this.montantHT = montantHT;
		this.montantTVA = montantTVA;
		this.montantTTC = montantTTC;
		this.remise = remise;
		this.notes = notes;
		this.inscription = inscription;
		this.paiements = paiements;
		this.archive = archive;
	}




	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumeroFacture() {
		return numeroFacture;
	}

	public void setNumeroFacture(String numeroFacture) {
		this.numeroFacture = numeroFacture;
	}

	

	public LocalDate getDateEmission() {
		return dateEmission;
	}




	public void setDateEmission(LocalDate dateEmission) {
		this.dateEmission = dateEmission;
	}




	public BigDecimal getRemise() {
		return remise;
	}




	public void setRemise(BigDecimal remise) {
		this.remise = remise;
	}




	public Inscription getInscription() {
		return inscription;
	}




	public void setInscription(Inscription inscription) {
		this.inscription = inscription;
	}




	public LocalDate getDateEcheance() {
		return dateEcheance;
	}

	public void setDateEcheance(LocalDate dateEcheance) {
		this.dateEcheance = dateEcheance;
	}

	public StatutFacture getStatut() {
		return statut;
	}

	public void setStatut(StatutFacture statut) {
		this.statut = statut;
	}

	public BigDecimal getMontantHT() {
		return montantHT;
	}

	public void setMontantHT(BigDecimal montantHT) {
		this.montantHT = montantHT;
	}

	public BigDecimal getMontantTVA() {
		return montantTVA;
	}

	public void setMontantTVA(BigDecimal montantTVA) {
		this.montantTVA = montantTVA;
	}

	public BigDecimal getMontantTTC() {
		return montantTTC;
	}

	public void setMontantTTC(BigDecimal montantTTC) {
		this.montantTTC = montantTTC;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	

	public List<Paiement> getPaiements() {
		return paiements;
	}

	public void setPaiements(List<Paiement> paiements) {
		this.paiements = paiements;
	}




	public boolean isArchive() {
		return archive;
	}




	public void setArchive(boolean archive) {
		this.archive = archive;
	}

	
    

}

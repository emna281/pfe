package com.example.demo.Entity;

import java.time.LocalDate;

import com.example.demo.Enumeration.StatutCharge;
import com.example.demo.Enumeration.TypeCharge;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "charges")
public class Charge {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false, length = 50)
    private String numeroCharge;  
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeCharge type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutCharge statut = StatutCharge.EN_ATTENTE;

    
    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private LocalDate dateCharge;
    
    private String periode;  
    
    @Column(nullable = false)
    private Double montant;
    
 
    
    private String justificatifPath; 
     
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private Session session;
    
    public Charge() {}
    
   
	public Charge(Long id, String numeroCharge, TypeCharge type, StatutCharge statut, String description,
			LocalDate dateCharge, String periode, Double montant, String justificatifPath, Session session) {
		super();
		this.id = id;
		this.numeroCharge = numeroCharge;
		this.type = type;
		this.statut = statut;
		this.description = description;
		this.dateCharge = dateCharge;
		this.periode = periode;
		this.montant = montant;
		this.justificatifPath = justificatifPath;
		this.session = session;
	}


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



	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}


	public StatutCharge getStatut() {
		return statut;
	}


	public void setStatut(StatutCharge statut) {
		this.statut = statut;
	}
	
    
}

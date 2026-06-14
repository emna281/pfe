package com.example.demo.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.demo.Enumeration.StatutPresence;

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
import jakarta.persistence.UniqueConstraint;


@Entity
@Table(
		name = "presences",
	    uniqueConstraints = {
	        @UniqueConstraint(columnNames = {"inscription_id", "jour_numero"})
	    }
		)
public class Presence {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(name = "jour_numero",nullable = false)
    private Integer jourNumero;
    
    private LocalDateTime heureArrivee;
    private LocalDateTime heureDepart;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutPresence statut = StatutPresence.NON_SAISI;
    
    private Double dureeEffective;  // en heures
    private String justificatifAbsence;
    private Boolean valideParFormateur = false;
    private String commentaireFormateur;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inscription_id", nullable = false)
    private Inscription inscription;

	public Presence() {}
	
    
    
    

	public Presence(LocalDate date, LocalDateTime heureArrivee, LocalDateTime heureDepart, StatutPresence statut,
			Double dureeEffective, String justificatifAbsence, Boolean valideParFormateur, String commentaireFormateur,
			Inscription inscription,Integer jourNumero) {
		super();
		this.date = date;
		this.heureArrivee = heureArrivee;
		this.heureDepart = heureDepart;
		this.statut = statut;
		this.dureeEffective = dureeEffective;
		this.justificatifAbsence = justificatifAbsence;
		this.valideParFormateur = valideParFormateur;
		this.commentaireFormateur = commentaireFormateur;
		this.inscription = inscription;
		this.jourNumero = jourNumero ;
	}
	
	public Presence(Inscription inscription, Integer jourNumero) {
	    this.inscription = inscription;
	    this.jourNumero = jourNumero;
	    this.statut = StatutPresence.NON_SAISI;
	    this.valideParFormateur = false;
	}
	public Session getSession() {
        return inscription.getSession();
    }

    public Apprenant getApprenant() {
        return inscription.getApprenant();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public LocalDateTime getHeureArrivee() {
		return heureArrivee;
	}

	public void setHeureArrivee(LocalDateTime heureArrivee) {
		this.heureArrivee = heureArrivee;
	}

	public LocalDateTime getHeureDepart() {
		return heureDepart;
	}

	public void setHeureDepart(LocalDateTime heureDepart) {
		this.heureDepart = heureDepart;
	}

	public StatutPresence getStatut() {
		return statut;
	}

	public void setStatut(StatutPresence statut) {
		this.statut = statut;
	}

	public Double getDureeEffective() {
		return dureeEffective;
	}

	public void setDureeEffective(Double dureeEffective) {
		this.dureeEffective = dureeEffective;
	}

	public String getJustificatifAbsence() {
		return justificatifAbsence;
	}

	public void setJustificatifAbsence(String justificatifAbsence) {
		this.justificatifAbsence = justificatifAbsence;
	}

	public Boolean getValideParFormateur() {
		return valideParFormateur;
	}

	public void setValideParFormateur(Boolean valideParFormateur) {
		this.valideParFormateur = valideParFormateur;
	}

	public String getCommentaireFormateur() {
		return commentaireFormateur;
	}

	public void setCommentaireFormateur(String commentaireFormateur) {
		this.commentaireFormateur = commentaireFormateur;
	}

	public Inscription getInscription() {
		return inscription;
	}

	public void setInscription(Inscription inscription) {
		this.inscription = inscription;
	}


	public Integer getJourNumero() {
		return jourNumero;
	}

	public void setJourNumero(Integer jourNumero) {
		this.jourNumero = jourNumero;
	}

	
    
}

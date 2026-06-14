package com.example.demo.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enumeration.StatutInscription;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
@Table(
	    name = "inscriptions",
	    uniqueConstraints = @UniqueConstraint(
	        columnNames = {"apprenant_id", "session_id"}
	    )
	)
public class Inscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    
    @Column(nullable = false)
    private LocalDateTime dateInscription = LocalDateTime.now();
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutInscription statut = StatutInscription.EN_ATTENTE;
    @Min(0)
    @Max(20)
    private Integer noteFormateur;
    
    @Min(0)
    @Max(20)
    private Integer noteFormation;
    
    @ManyToOne
    @JoinColumn(name = "session_id")
    @JsonIgnore
    private Session session;
    
    @ManyToOne
    @JoinColumn(name = "apprenant_id")
    @JsonIgnore
    private Apprenant apprenant;
    
    @OneToOne(mappedBy = "inscription")
    
    @JsonIgnore
    private Facture facture;

    @OneToOne(mappedBy = "inscription", fetch = FetchType.LAZY)
    @JsonIgnore
    private DemandeInscription demandeInscription;

 
    @OneToMany(mappedBy = "inscription", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Presence> presences = new ArrayList<>();
    
    @Column(nullable = false)
    private Boolean facturee;
    
    
	public Facture getFacture() {
		return facture;
	}

	public void setFacture(Facture facture) {
		this.facture = facture;
	}

	public Inscription() {

	}

	
	public Inscription(LocalDateTime dateInscription, StatutInscription statut, @Min(0) @Max(20) Integer noteFormateur,
			@Min(0) @Max(20) Integer noteFormation, Session session, Apprenant apprenant, Facture facture,
			DemandeInscription demandeInscription, List<Presence> presences,Boolean facturee) {
		super();
		this.dateInscription = dateInscription;
		this.statut = statut;
		this.noteFormateur = noteFormateur;
		this.noteFormation = noteFormation;
		this.session = session;
		this.apprenant = apprenant;
		this.facture = facture;
		this.demandeInscription = demandeInscription;
		this.presences = presences;
		this.facturee = facturee;
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

	public Apprenant getApprenant() {
		return apprenant;
	}

	public void setApprenant(Apprenant apprenant) {
		this.apprenant = apprenant;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public LocalDateTime getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(LocalDateTime dateInscription) {
		this.dateInscription = dateInscription;
	}

	public StatutInscription getStatut() {
		return statut;
	}

	public void setStatut(StatutInscription statut) {
		this.statut = statut;
	}


	public Integer getNoteFormateur() {
		return noteFormateur;
	}

	public void setNoteFormateur(Integer noteFormateur) {
		this.noteFormateur = noteFormateur;
	}

	public Integer getNoteFormation() {
		return noteFormation;
	}

	public void setNoteFormation(Integer noteFormation) {
		this.noteFormation = noteFormation;
	}

	public DemandeInscription getDemandeInscription() {
		return demandeInscription;
	}

	public void setDemandeInscription(DemandeInscription demandeInscription) {
		this.demandeInscription = demandeInscription;
	}

	public List<Presence> getPresences() {
		return presences;
	}

	public void setPresences(List<Presence> presences) {
		this.presences = presences;
	}

	public Boolean getFacturee() {
		return facturee;
	}

	public void setFacturee(Boolean facturee) {
		this.facturee = facturee;
	}
	
    
}

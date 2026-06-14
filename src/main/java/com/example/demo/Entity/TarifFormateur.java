package com.example.demo.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tarifs_formateur")
public class TarifFormateur {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Double tarifHoraire;
    
    @Column(nullable = false)
    private LocalDate dateDebut;
    
    private LocalDate dateFin;
    
    @Column(length = 500)
    private String commentaire;  // "Augmentation annuelle", "Négociation spéciale", etc.
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "formateur_id", nullable = false)
    private Formateur formateur;
    public TarifFormateur() {}
    
    public TarifFormateur(Double tarifHoraire, LocalDate dateDebut, Formateur formateur) {
        this.tarifHoraire = tarifHoraire;
        this.dateDebut = dateDebut;
        this.formateur = formateur;
    }
    
    public TarifFormateur(Double tarifHoraire, LocalDate dateDebut, LocalDate dateFin, 
                         String commentaire, Formateur formateur) {
        this(tarifHoraire, dateDebut, formateur);
        this.dateFin = dateFin;
        this.commentaire = commentaire;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getTarifHoraire() {
		return tarifHoraire;
	}

	public void setTarifHoraire(Double tarifHoraire) {
		this.tarifHoraire = tarifHoraire;
	}

	public LocalDate getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(LocalDate dateDebut) {
		this.dateDebut = dateDebut;
	}

	public LocalDate getDateFin() {
		return dateFin;
	}

	public void setDateFin(LocalDate dateFin) {
		this.dateFin = dateFin;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Formateur getFormateur() {
		return formateur;
	}

	public void setFormateur(Formateur formateur) {
		this.formateur = formateur;
	}
    

}

package com.example.demo.Entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "salles")
public class Salle {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false, length = 20)
    private String numero;
    @Column(nullable = false)
    private Integer capacite;
    
    private String equipements;   
    private String batiment;   
    private String etage;  
    @Column(nullable = false)
    private Boolean disponible = true;
    
   
    
    @OneToMany(mappedBy = "salle")
    @JsonIgnore
    private List<Session> sessions = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "centre_id")  // Nom de la colonne dans la table formateur
    private Centre centre; 
    
    public Centre getCentre() {
		return centre;
	}

	public void setCentre(Centre centre) {
		this.centre = centre;
	}

	public Salle() {}
    
    public Salle(String numero, String nom, Integer capacite) {
        this.numero = numero;
        this.capacite = capacite;
        this.disponible = true;
    }
    
    public Salle(String code, String nom, Integer capacite, String equipements, 
                 String batiment, Double prixLocationHeure) {
        this(code, nom, capacite);
        this.equipements = equipements;
        this.batiment = batiment;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public Integer getCapacite() {
		return capacite;
	}

	public void setCapacite(Integer capacite) {
		this.capacite = capacite;
	}

	public String getEquipements() {
		return equipements;
	}

	public void setEquipements(String equipements) {
		this.equipements = equipements;
	}

	public String getBatiment() {
		return batiment;
	}

	public void setBatiment(String batiment) {
		this.batiment = batiment;
	}

	public String getEtage() {
		return etage;
	}

	public void setEtage(String etage) {
		this.etage = etage;
	}

	public Boolean getDisponible() {
		return disponible;
	}

	public void setDisponible(Boolean disponible) {
		this.disponible = disponible;
	}



	public List<Session> getSessions() {
		return sessions;
	}

	public void setSessions(List<Session> sessions) {
		this.sessions = sessions;
	}
    
    
}

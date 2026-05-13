package com.example.demo.Entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enumeration.RoleUtilisateur;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "formateurs")
@PrimaryKeyJoinColumn(name = "utilisateur_id")
public class Formateur extends Utilisateur{
	private String specialite;
    private Integer anneesExperience;
    
    @Lob  
    private String bio;
    
    private String cvPath;  
    
    @ElementCollection
    @CollectionTable(name = "formateur_competences", 
    				joinColumns = @JoinColumn(name = "formateur_id"))
    @Column(name = "competence")
    private List<String> competencesList = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "formateur_diplomes", 
    				joinColumns = @JoinColumn(name = "formateur_id"))
    @Column(name = "diplome")
    private List<String> diplomes = new ArrayList<>();
    
    private Double noteMoyenne = 0.0;
    private Integer heuresEnseigneesTotal = 0;
    private Boolean disponibilite = true;
    
  
    private LocalDate dateEntree;
    
    @OneToMany(mappedBy = "formateur", cascade = CascadeType.ALL)
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

	public Formateur() {
        super();
    }
    
    public Formateur(String email, String motDePasse, String nom, String prenom,
                     String telephone, String specialite) {
        super(email, motDePasse, RoleUtilisateur.FORMATEUR, nom, prenom, telephone,false);
        this.specialite = specialite;
        this.dateEntree = LocalDate.now();
        this.disponibilite = true;
    }
    
    public Formateur(String email, String motDePasse, String nom, String prenom,
                     String telephone, String specialite, Integer anneesExperience) {
        this(email, motDePasse, nom, prenom, telephone, specialite);
        this.anneesExperience = anneesExperience;
       
    }

	public String getSpecialite() {
		return specialite;
	}

	public void setSpecialite(String specialite) {
		this.specialite = specialite;
	}

	public Integer getAnneesExperience() {
		return anneesExperience;
	}

	public void setAnneesExperience(Integer anneesExperience) {
		this.anneesExperience = anneesExperience;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getCvPath() {
		return cvPath;
	}

	

	public List<String> getCompetencesList() {
		return competencesList;
	}

	public void setCompetencesList(List<String> competencesList) {
		this.competencesList = competencesList;
	}

	public List<String> getDiplomes() {
		return diplomes;
	}

	public void setDiplomes(List<String> diplomes) {
		this.diplomes = diplomes;
	}

	public Double getNoteMoyenne() {
		return noteMoyenne;
	}

	public void setNoteMoyenne(Double noteMoyenne) {
		this.noteMoyenne = noteMoyenne;
	}

	public Integer getHeuresEnseigneesTotal() {
		return heuresEnseigneesTotal;
	}

	public void setHeuresEnseigneesTotal(Integer heuresEnseigneesTotal) {
		this.heuresEnseigneesTotal = heuresEnseigneesTotal;
	}

	public Boolean getDisponibilite() {
		return disponibilite;
	}

	public void setDisponibilite(Boolean disponibilite) {
		this.disponibilite = disponibilite;
	}

	
	public LocalDate getDateEntree() {
		return dateEntree;
	}

	public void setDateEntree(LocalDate dateEntree) {
		this.dateEntree = dateEntree;
	}

	public List<Session> getSessions() {
		return sessions;
	}

	public void setSessions(List<Session> sessions) {
		this.sessions = sessions;
	}
	@Override
	public void setCvPath(String path) {
	    this.cvPath = path;
	}

}

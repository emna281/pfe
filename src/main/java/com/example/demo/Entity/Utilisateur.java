package com.example.demo.Entity;

import java.time.LocalDateTime;

import com.example.demo.Enumeration.RoleUtilisateur;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;



@Entity
@Table(name = "utilisateurs")  
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Utilisateur {
	
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    


	@Column(unique = true, nullable = false)  
    private String email;
    
    @Column(nullable = false)  
    private String motDePasse; 
    
   
    
    @Enumerated(EnumType.STRING)  
    private RoleUtilisateur role;
    
    private String nom;
    private String prenom;
    private String telephone;
    @Column(name = "date_creation")  
    @JsonProperty("dateCreation")
    private LocalDateTime dateCreation;  
    
    private Boolean actif = true;
    
    @Override
	public String toString() {
		return "Utilisateur [id=" + id + ", email=" + email + ", motDePasse=" + motDePasse + ", role=" + role + ", nom="
				+ nom + ", prenom=" + prenom + ", telephone=" + telephone + ", dateCreation=" + dateCreation
				+ ", actif=" + actif + "]";
	}

	public Utilisateur() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMotDePasse() {
		return motDePasse;
	}

	public void setMotDePasse(String motDePasse) {
		this.motDePasse = motDePasse;
	}

	public RoleUtilisateur getRole() {
		return role;
	}

	public void setRole(RoleUtilisateur role) {
		this.role = role;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public LocalDateTime getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(LocalDateTime dateCreation) {
		this.dateCreation = dateCreation;
	}

	public Boolean getActif() {
		return actif;
	}

	public void setActif(Boolean actif) {
		this.actif = actif;
	}

	public abstract void setCvPath(String path);


	public Utilisateur(String email, String motDePasse, RoleUtilisateur role,
            String nom, String prenom) {
		this.email = email;
		this.motDePasse = motDePasse;
		this.role = role;
		this.nom = nom;
		this.prenom = prenom;
		this.dateCreation = LocalDateTime.now();
		this.actif = true;
	}

	public Utilisateur(String email, String motDePasse, RoleUtilisateur role,
            String nom, String prenom, String telephone,Boolean mdpTemporaire) {
		this(email, motDePasse, role, nom, prenom);  // Appelle le constructeur ci-dessus
		this.telephone = telephone;
		
	}
}

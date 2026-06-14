package com.example.demo.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enumeration.RoleUtilisateur;
import com.example.demo.Enumeration.statusApprenant;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "apprenants")
@PrimaryKeyJoinColumn(name = "utilisateur_id")
public class Apprenant extends Utilisateur{
    @Column(unique = true)
    private Long numeroEnregistrement;  
    
    private String posteActuel;
    private String niveauEtude;
    private statusApprenant status;
    
    
    @OneToMany(mappedBy = "apprenant", cascade = CascadeType.ALL)
    private List<Inscription> inscriptions = new ArrayList<>();
    
    
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entreprise_id", nullable = true)
    private Entreprise entreprise;
    
    

	public Apprenant() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Apprenant(String email, String motDePasse, String nom, String prenom,String telephone, Long numeroEnregistrement) {
		super(email, motDePasse, RoleUtilisateur.APPRENANT, nom, prenom, telephone,false);
		this.numeroEnregistrement = numeroEnregistrement;
		this.status = statusApprenant.ACTIF;
	}

	public Apprenant(Long numeroEnregistrement, String posteActuel, String niveauEtude, statusApprenant status,
			List<Inscription> inscriptions,  Entreprise entreprise) {
		super();
		this.numeroEnregistrement = numeroEnregistrement;
		this.posteActuel = posteActuel;
		this.niveauEtude = niveauEtude;
		this.status = status;
		this.inscriptions = inscriptions;
		this.entreprise = entreprise;
		
	}

	public Long getNumeroEnregistrement() {
		return numeroEnregistrement;
	}

	public void setNumeroEnregistrement(Long numeroEnregistrement) {
		this.numeroEnregistrement = numeroEnregistrement;
	}

	public String getPosteActuel() {
		return posteActuel;
	}

	public void setPosteActuel(String posteActuel) {
		this.posteActuel = posteActuel;
	}

	public String getNiveauEtude() {
		return niveauEtude;
	}

	public void setNiveauEtude(String niveauEtude) {
		this.niveauEtude = niveauEtude;
	}

	public statusApprenant getStatus() {
		return status;
	}

	public void setStatus(statusApprenant status) {
		this.status = status;
	}

	public List<Inscription> getInscriptions() {
		return inscriptions;
	}

	public void setInscriptions(List<Inscription> inscriptions) {
		this.inscriptions = inscriptions;
	}



	public Entreprise getEntreprise() {
		return entreprise;
	}

	public void setEntreprise(Entreprise entreprise) {
		this.entreprise = entreprise;
	}

	
	
    

}

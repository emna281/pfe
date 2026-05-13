package com.example.demo.Entity;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enumeration.TypeContratEntreprise;

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
import jakarta.persistence.Table;

@Entity
@Table(name = "entreprises")
public class Entreprise {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false, length = 14)
    private String siret;
    
    private String raisonSociale;
    private String nomCommercial;
    
    private String adresse;
    private String codePostal;
    private String ville;
    private String pays = "France";
    
    private String telephone;
    private String emailContact;
    
    
    private String secteurActivite;
    
    @Enumerated(EnumType.STRING)
    private TypeContratEntreprise typeContrat;
    
    private Double montantContratAnnuel;
    private Double remisePourcentage;
    
    @OneToMany(mappedBy = "entreprise", cascade = CascadeType.ALL)
    private List<Apprenant> apprenant = new ArrayList<>();
    
    public Entreprise() {}
    
    public Entreprise(String siret, String raisonSociale, String emailContact) {
        this.siret = siret;
        this.raisonSociale = raisonSociale;
        this.emailContact = emailContact;
    }
    
    public Entreprise(String siret, String raisonSociale, String adresse, 
                     String codePostal, String ville, String telephone, 
                     String emailContact) {
        this(siret, raisonSociale, emailContact);
        this.adresse = adresse;
        this.codePostal = codePostal;
        this.ville = ville;
        this.telephone = telephone;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSiret() {
		return siret;
	}

	public void setSiret(String siret) {
		this.siret = siret;
	}

	public String getRaisonSociale() {
		return raisonSociale;
	}

	public void setRaisonSociale(String raisonSociale) {
		this.raisonSociale = raisonSociale;
	}

	public String getNomCommercial() {
		return nomCommercial;
	}

	public void setNomCommercial(String nomCommercial) {
		this.nomCommercial = nomCommercial;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public String getPays() {
		return pays;
	}

	public void setPays(String pays) {
		this.pays = pays;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmailContact() {
		return emailContact;
	}

	public void setEmailContact(String emailContact) {
		this.emailContact = emailContact;
	}

	public String getSecteurActivite() {
		return secteurActivite;
	}

	public void setSecteurActivite(String secteurActivite) {
		this.secteurActivite = secteurActivite;
	}

	public TypeContratEntreprise getTypeContrat() {
		return typeContrat;
	}

	public void setTypeContrat(TypeContratEntreprise typeContrat) {
		this.typeContrat = typeContrat;
	}

	public Double getMontantContratAnnuel() {
		return montantContratAnnuel;
	}

	public void setMontantContratAnnuel(Double montantContratAnnuel) {
		this.montantContratAnnuel = montantContratAnnuel;
	}

	public Double getRemisePourcentage() {
		return remisePourcentage;
	}

	public void setRemisePourcentage(Double remisePourcentage) {
		this.remisePourcentage = remisePourcentage;
	}

	public List<Apprenant> getApprenant() {
		return apprenant;
	}

	public void setApprenant(List<Apprenant> apprenant) {
		this.apprenant = apprenant;
	}
    

}

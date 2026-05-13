package com.example.demo.Entity;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enumeration.CategorieCompetence;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "competences")  
public class Competence {
	@Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
	@Column(unique = true, nullable = false, length = 20)
    private String code; 
	 @Column(nullable = false)
    private String nom;
    @Column(length = 2000)
    private String description;
    @Enumerated(EnumType.STRING)
    private CategorieCompetence categorie;
    
    @ManyToMany(mappedBy = "competences")
    private List<Formation> formations;
    
    public Competence() {
       
    }
    
    public Competence(String code, String nom, CategorieCompetence categorie) {
        this.code = code;
        this.nom = nom;
        this.categorie = categorie;
    }
    
    public Competence(String code, String nom, String description, 
                      CategorieCompetence categorie) {
        this(code, nom, categorie);
        this.description = description;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	@PrePersist
	public void generateCode() {
	    if (this.code == null || this.code.isEmpty()) {
	       
	        this.code = "COM-" + java.time.Year.now().getValue() + "-" + (int)(Math.random() * 1000);
	    }
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public CategorieCompetence getCategorie() {
		return categorie;
	}

	public void setCategorie(CategorieCompetence categorie) {
		this.categorie = categorie;
	}

	public List<Formation> getFormations() {
		return formations;
	}

	public void setFormations(List<Formation> formations) {
		this.formations = formations;
	}

	@Override
	public String toString() {
		return "Competence [id=" + id + ", code=" + code + ", nom=" + nom + ", description=" + description
				+ ", categorie=" + categorie + ", detailFormation=" + formations + "]";
	}
    
}

package com.example.demo.Entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "formations")  
public class Formation {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    @Column(unique = true, nullable = false, length = 20)
    private String code;  
    private String titre;
    @Column(length = 2000)
    private String description;
    private Integer dureeJours;
    private Integer dureeHeures;
    private Double prixPublic;
    private String publicCible;
    @Column(length = 1000)
    private String prerequis;
    @Lob 
    private String programme;
    private String version ;
    private Boolean actif=true ;
    @Column(nullable = false)
    private boolean archive = false;
    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL)
    private List<Session> sessions = new ArrayList<>();
    
    @ManyToMany
    private List<Competence> competences;
    


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
	       
	        this.code = "FOR-" + java.time.Year.now().getValue() + "-" + (int)(Math.random() * 1000);
	    }
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getDureeJours() {
		return dureeJours;
	}

	public void setDureeJours(Integer dureeJours) {
		this.dureeJours = dureeJours;
	}

	public Integer getDureeHeures() {
		return dureeHeures;
	}

	public void setDureeHeures(Integer dureeHeures) {
		this.dureeHeures = dureeHeures;
	}

	public Double getPrixPublic() {
		return prixPublic;
	}

	public void setPrixPublic(Double prixPublic) {
		this.prixPublic = prixPublic;
	}

	public String getPublicCible() {
		return publicCible;
	}

	public void setPublicCible(String publicCible) {
		this.publicCible = publicCible;
	}

	public String getPrerequis() {
		return prerequis;
	}

	public void setPrerequis(String prerequis) {
		this.prerequis = prerequis;
	}

	public String getProgramme() {
		return programme;
	}

	public void setProgramme(String programme) {
		this.programme = programme;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Boolean getActif() {
		return actif;
	}

	public void setActif(Boolean actif) {
		this.actif = actif;
	}

	public List<Session> getSessions() {
		return sessions;
	}

	public void setSessions(List<Session> sessions) {
		this.sessions = sessions;
	}

	public List<Competence> getCompetences() {
		return competences;
	}

	public void setCompetences(List<Competence> competences) {
		this.competences = competences;
	}
	

	public boolean isArchive() {
		return archive;
	}

	public void setArchive(boolean archive) {
		this.archive = archive;
	}

	public Formation() {
		
	}
	public Formation(String code, String titre, boolean archive) {
	    this.code = code;
	    this.titre = titre;
	    this.actif = true;    
	    this.version = "1.0";
	    this.archive = false;
	}
	public Formation(String code, String titre, String description, 
            Integer dureeHeures, Double prixPublic) {
		this(code, titre,false);  
		this.description = description;
		this.dureeHeures = dureeHeures;
		this.prixPublic = prixPublic;
	}
	@Override
	public String toString() {
		return "Formation [id=" + id + ", code=" + code + ", titre=" + titre + ", description=" + description
				+ ", dureeJours=" + dureeJours + ", dureeHeures=" + dureeHeures + ", prixPublic=" + prixPublic
				+ ", publicCible=" + publicCible + ", prerequis=" + prerequis + ", programme=" + programme
				+ ", version=" + version + ", actif=" + actif + "]";
	}
	
	}

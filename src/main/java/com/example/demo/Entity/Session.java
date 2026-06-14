package com.example.demo.Entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.Enumeration.ModeSession;
import com.example.demo.Enumeration.StatutSession;
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
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "sessions")
public class Session {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false, length = 30)
    private String code;  
    
    private String nom;  
    
    @Column(nullable = false)
    private LocalDate dateDebut;
    
    @Column(nullable = false)
    private LocalDate dateFin;
    
    private LocalTime heureDebut;  
    private LocalTime heureFin;    
    
    @Column(nullable = false)
    private Integer placesMax = 20;  
    
    private Integer placesRestantes;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutSession statut = StatutSession.PLANIFIEE; 
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ModeSession mode = ModeSession.PRESENTIEL;  
    
    private String lieu;      
    private String lienVisio;  
    private String materielRequis;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "formation_id", nullable = false)
    private Formation formation;
	
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<Inscription> inscriptions = new ArrayList<>();

    
    @ManyToOne
    @JoinColumn(name = "salle_id")
    @JsonIgnore
    private Salle salle;
    
    @ManyToOne
    @JoinColumn(name = "formateur_id")
    private Formateur formateur;
    
 

	
    
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<Charge> charge = new ArrayList<>();
    
    @Column(nullable = false)
    private boolean archive = false;
    
    @Column(nullable = false)
    private BigDecimal prix;

	public Session() {

	}

	public Session(String code, String nom, LocalDate dateDebut, LocalDate dateFin, LocalTime heureDebut,
			LocalTime heureFin, Integer placesMax, Integer placesRestantes, StatutSession statut, ModeSession mode,
			String lieu, String lienVisio, String materielRequis, Formation formation, List<Inscription> inscriptions,
			 Salle salle, List<Charge> charge,boolean archive,BigDecimal prix) {
		super();
		this.code = code;
		this.nom = nom;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.heureDebut = heureDebut;
		this.heureFin = heureFin;
		this.placesMax = placesMax;
		this.placesRestantes = placesRestantes;
		this.statut = statut;
		this.mode = mode;
		this.lieu = lieu;
		this.lienVisio = lienVisio;
		this.materielRequis = materielRequis;
		this.formation = formation;
		this.inscriptions = inscriptions;
		this.salle = salle;
		
		this.charge = charge;
		this.archive=archive;
		this.prix=prix;
	}
	@PrePersist
	public void prePersist() {
	    if (this.code == null || this.code.isEmpty()) {
	       
	        this.code = "Sess-" + java.time.Year.now().getValue() + "-" + (int)(Math.random() * 1000);
	    }
	    if (this.placesRestantes == null) {
	    	this.placesRestantes = this.placesMax;
	    }
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

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
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

	public LocalTime getHeureDebut() {
		return heureDebut;
	}

	public void setHeureDebut(LocalTime heureDebut) {
		this.heureDebut = heureDebut;
	}

	public LocalTime getHeureFin() {
		return heureFin;
	}

	public void setHeureFin(LocalTime heureFin) {
		this.heureFin = heureFin;
	}

	public Integer getPlacesMax() {
		return placesMax;
	}

	public void setPlacesMax(Integer placesMax) {
		this.placesMax = placesMax;
	}

	public Integer getPlacesRestantes() {
		return placesRestantes;
	}

	public void setPlacesRestantes(Integer placesRestantes) {
		this.placesRestantes = placesRestantes;
	}

	public StatutSession getStatut() {
		return statut;
	}

	public void setStatut(StatutSession statut) {
		this.statut = statut;
	}

	public ModeSession getMode() {
		return mode;
	}

	public void setMode(ModeSession mode) {
		this.mode = mode;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public String getLienVisio() {
		return lienVisio;
	}

	public void setLienVisio(String lienVisio) {
		this.lienVisio = lienVisio;
	}

	public String getMaterielRequis() {
		return materielRequis;
	}

	public void setMaterielRequis(String materielRequis) {
		this.materielRequis = materielRequis;
	}

	public Formation getFormation() {
		return formation;
	}

	public void setFormation(Formation formation) {
		this.formation = formation;
	}

	public List<Inscription> getInscriptions() {
		return inscriptions;
	}

	public void setInscriptions(List<Inscription> inscriptions) {
		this.inscriptions = inscriptions;
	}


	public Salle getSalle() {
		return salle;
	}

	public void setSalle(Salle salle) {
		this.salle = salle;
	}

	

	public List<Charge> getCharge() {
		return charge;
	}

	public void setCharge(List<Charge> charge) {
		this.charge = charge;
	}
	   public Formateur getFormateur() {
			return formateur;
		}

		public void setFormateur(Formateur formateur) {
			this.formateur = formateur;
		}
		

	public boolean isArchive() {
			return archive;
		}

		public void setArchive(boolean archive) {
			this.archive = archive;
		}
	

	public BigDecimal getPrix() {
			return prix;
		}

		public void setPrix(BigDecimal prix) {
			this.prix = prix;
		}

	
	
	@Override
		public String toString() {
			return "Session [id=" + id + ", code=" + code + ", nom=" + nom + ", dateDebut=" + dateDebut + ", dateFin="
					+ dateFin + ", heureDebut=" + heureDebut + ", heureFin=" + heureFin + ", placesMax=" + placesMax
					+ ", placesRestantes=" + placesRestantes + ", statut=" + statut + ", mode=" + mode + ", lieu="
					+ lieu + ", lienVisio=" + lienVisio + ", materielRequis=" + materielRequis + ", formation="
					+ formation + ", inscriptions=" + inscriptions +  ", salle=" + salle
					+ ", formateur=" + formateur + ", charge=" + charge + ", archive=" + archive + ", prix=" + prix
					+ "]";
		}

	public void updateStatut() {

        LocalDate today = LocalDate.now();

        if (today.isBefore(this.dateDebut)) {
            this.statut = StatutSession.PLANIFIEE;
        } 
        else if (today.isAfter(this.dateFin)) {
            this.statut = StatutSession.TERMINEE;
        } 
        else {
            this.statut = StatutSession.EN_COURS;
        }
    }
    
    
}

package com.example.demo.Entity;

import java.time.LocalDateTime;

import com.example.demo.Enumeration.Genre;
import com.example.demo.Enumeration.MoyenInscription;
import com.example.demo.Enumeration.StatutDemande;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name="demande_inscription")
public class DemandeInscription {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(nullable = false)
	private String nom;
	
	@Column(nullable = false)
	private String prenom;
	
	@Column(nullable = false)
	private String email;
	
	private String telephone;
	
	@Enumerated(EnumType.STRING)
    private Genre genre;
	
	private String posteActuel;
    
	private String entreprise;
    
    
    private String niveauDeclare;
    
	@Column(nullable = false)
	private String maitrisePrerequis;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private MoyenInscription moyenInscription;
	
	private String commentaires;
	
	@Enumerated(EnumType.STRING)
	private StatutDemande statut= StatutDemande.EN_ATTENTE; 
	
	private LocalDateTime dateDemande=LocalDateTime.now();
	  
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    // 1 demande concerne 1 seul apprenant (créé après validation)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apprenant_id")
    private Apprenant apprenant;       // null avant validation

    // 1 demande génère 1 seule inscription (créée après validation)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inscription_id")
    private Inscription inscription;

	public DemandeInscription() {}

	public DemandeInscription(String nom, String prenom, String email, String telephone, Genre genre,
			String posteActuel, String entreprise, String niveauDeclare, String maitrisePrerequis,
			MoyenInscription moyenInscription, String commentaires, StatutDemande statut, LocalDateTime dateDemande,
			Session session, Apprenant apprenant, Inscription inscription) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.telephone = telephone;
		this.genre = genre;
		this.posteActuel = posteActuel;
		this.entreprise = entreprise;
		this.niveauDeclare = niveauDeclare;
		this.maitrisePrerequis = maitrisePrerequis;
		this.moyenInscription = moyenInscription;
		this.commentaires = commentaires;
		this.statut = statut;
		this.dateDemande = dateDemande;
		this.session = session;
		this.apprenant = apprenant;
		this.inscription = inscription;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Genre getGenre() {
		return genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}

	public String getPosteActuel() {
		return posteActuel;
	}

	public void setPosteActuel(String posteActuel) {
		this.posteActuel = posteActuel;
	}

	public String getEntreprise() {
		return entreprise;
	}

	public void setEntreprise(String entreprise) {
		this.entreprise = entreprise;
	}

	public String getNiveauDeclare() {
		return niveauDeclare;
	}

	public void setNiveauDeclare(String niveauDeclare) {
		this.niveauDeclare = niveauDeclare;
	}

	public String getMaitrisePrerequis() {
		return maitrisePrerequis;
	}

	public void setMaitrisePrerequis(String maitrisePrerequis) {
		this.maitrisePrerequis = maitrisePrerequis;
	}

	public MoyenInscription getMoyenInscription() {
		return moyenInscription;
	}

	public void setMoyenInscription(MoyenInscription moyenInscription) {
		this.moyenInscription = moyenInscription;
	}

	public String getCommentaires() {
		return commentaires;
	}

	public void setCommentaires(String commentaires) {
		this.commentaires = commentaires;
	}

	public StatutDemande getStatut() {
		return statut;
	}

	public void setStatut(StatutDemande statut) {
		this.statut = statut;
	}

	public LocalDateTime getDateDemande() {
		return dateDemande;
	}

	public void setDateDemande(LocalDateTime dateDemande) {
		this.dateDemande = dateDemande;
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

	public Inscription getInscription() {
		return inscription;
	}

	public void setInscription(Inscription inscription) {
		this.inscription = inscription;
	}

	
    
	

}

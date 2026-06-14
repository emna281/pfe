package com.example.demo.DTO.Response;

import java.time.LocalDateTime;

import com.example.demo.Enumeration.Genre;
import com.example.demo.Enumeration.MoyenInscription;
import com.example.demo.Enumeration.StatutDemande;

public class DemandeInscriptionResponse {
	private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String telephone;

    private Genre genre;

    private String posteActuel;
    private String entreprise;
    private String niveauDeclare;
    private String maitrisePrerequis;

    private MoyenInscription moyenInscription;
    private String commentaires;

    private StatutDemande statut;

    private LocalDateTime dateDemande;

    private String commentaireAdmin;
    
    private Long sessionId;
    private String sessionCode;
	public DemandeInscriptionResponse() {}
	public DemandeInscriptionResponse(Long id, String nom, String prenom, String email, String telephone, Genre genre,
			String posteActuel, String entreprise, String niveauDeclare, String maitrisePrerequis,
			MoyenInscription moyenInscription, String commentaires, StatutDemande statut, LocalDateTime dateDemande,
			String sessionCode, String sessionNom,String commentaireAdmin) {
		super();
		this.id = id;
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
		this.sessionId = sessionId;
		this.sessionCode = sessionCode;
		this.commentaireAdmin = commentaireAdmin;
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
	public Long getSessionId() {
		return sessionId;
	}
	public void setSessionId(Long sessionId) {
		this.sessionId = sessionId;
	}
	public String getSessionCode() {
		return sessionCode;
	}
	public void setSessionCode(String sessionCode) {
		this.sessionCode = sessionCode;
	}
	public String getCommentaireAdmin() {
		return commentaireAdmin;
	}
	public void setCommentaireAdmin(String commentaireAdmin) {
		this.commentaireAdmin = commentaireAdmin;
	}
	
    
}

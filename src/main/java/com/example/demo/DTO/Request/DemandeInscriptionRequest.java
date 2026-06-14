package com.example.demo.DTO.Request;

import com.example.demo.Enumeration.Genre;
import com.example.demo.Enumeration.MoyenInscription;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DemandeInscriptionRequest {
	@NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Email invalide")
    private String email;

    private String telephone;       
    private Genre genre;            
    private String posteActuel;     
    private String entreprise;     

   
    @NotBlank(message = "Le niveau est obligatoire")
    private String niveauDeclare;


    @NotBlank(message = "Ce champ est obligatoire")
    private String maitrisePrerequis;
    
    @NotNull(message = "Le moyen d'inscription est obligatoire")
    private MoyenInscription moyenInscription;

    private String commentaires;

	public DemandeInscriptionRequest() {}

	public DemandeInscriptionRequest(@NotBlank(message = "Le nom est obligatoire") String nom,
			@NotBlank(message = "Le prénom est obligatoire") String prenom,
			@NotBlank(message = "L'email est obligatoire") @Email(message = "Email invalide") String email,
			String telephone, Genre genre, String posteActuel, String entreprise,
			@NotBlank(message = "Le niveau est obligatoire") String niveauDeclare,
			
			@NotBlank(message = "Ce champ est obligatoire") String maitrisePrerequis,
			@NotNull(message = "Le moyen d'inscription est obligatoire") MoyenInscription moyenInscription,
			String commentaires) {
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
    
    

}

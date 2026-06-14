package com.example.demo.Entity;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "centres")
public class Centre {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String code;  // Ex: "CENTRE-PARIS", "CENTRE-LYON"
    
    @Column(nullable = false)
    private String nom;
    
    private String adresse;
    private String codePostal;
    private String ville;
    private String pays = "France";
    
    @Column(nullable = false)
    private String telephone;
    
    @Column(nullable = false)
    private String email;
    
    private String directeur;
    private Integer capaciteAccueil;
    private String horaires;  // "9h-18h du lundi au vendredi"
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Boolean actif = true;
    
    // Relations
    @OneToMany(mappedBy = "centre", cascade = CascadeType.ALL)
    private List<Salle> salles = new ArrayList<>();
    
    @OneToMany(mappedBy = "centre", cascade = CascadeType.ALL)
    private List<Formateur> formateurs = new ArrayList<>();
    
    //@OneToMany(mappedBy = "centre", cascade = CascadeType.ALL)
    //private List<Session> sessions = new ArrayList<>();
    
    //@OneToMany(mappedBy = "centre", cascade = CascadeType.ALL)
    //private List<Charge> charges = new ArrayList<>();
    
    // ========= CONSTRUCTEURS =========
    
    public Centre() {}
    
    public Centre(String code, String nom, String adresse, String telephone, String email) {
        this.code = code;
        this.nom = nom;
        this.adresse = adresse;
        this.telephone = telephone;
        this.email = email;
    }
    
    public Centre(String code, String nom, String adresse, String codePostal, 
                  String ville, String telephone, String email, String directeur) {
        this(code, nom, adresse, telephone, email);
        this.codePostal = codePostal;
        this.ville = ville;
        this.directeur = directeur;
    }
    
    // ========= GETTERS/SETTERS =========
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }
    
    public String getCodePostal() { return codePostal; }
    public void setCodePostal(String codePostal) { this.codePostal = codePostal; }
    
    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }
    
    public String getPays() { return pays; }
    public void setPays(String pays) { this.pays = pays; }
    
    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getDirecteur() { return directeur; }
    public void setDirecteur(String directeur) { this.directeur = directeur; }
    
    public Integer getCapaciteAccueil() { return capaciteAccueil; }
    public void setCapaciteAccueil(Integer capaciteAccueil) { this.capaciteAccueil = capaciteAccueil; }
    
    public String getHoraires() { return horaires; }
    public void setHoraires(String horaires) { this.horaires = horaires; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Boolean getActif() { return actif; }
    public void setActif(Boolean actif) { this.actif = actif; }
    
    public List<Salle> getSalles() { return salles; }
    public void setSalles(List<Salle> salles) { this.salles = salles; }
    
    public List<Formateur> getFormateurs() { return formateurs; }
    public void setFormateurs(List<Formateur> formateurs) { this.formateurs = formateurs; }
    
    //public List<Session> getSessions() { return sessions; }
    //public void setSessions(List<Session> sessions) { this.sessions = sessions; }
    
    //public List<Charge> getCharges() { return charges; }
    //public void setCharges(List<Charge> charges) { this.charges = charges; }
}
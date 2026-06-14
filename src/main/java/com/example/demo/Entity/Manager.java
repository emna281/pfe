package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "managers")
@PrimaryKeyJoinColumn(name = "utilisateur_id")
public class Manager extends Utilisateur{
	private String specialite;
    private Integer anneesExperience;
    private String cvPath;

    public String getSpecialite() { return specialite; }
    public void setSpecialite(String specialite) { this.specialite = specialite; }
    
    public Integer getAnneesExperience() { return anneesExperience; }
    public void setAnneesExperience(Integer anneesExperience) { this.anneesExperience = anneesExperience; }
    
    public String getCvPath() { return cvPath; }
    public void setCvPath(String cvPath) { this.cvPath = cvPath; }

}

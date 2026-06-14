package com.example.demo.Entity;

import com.example.demo.Enumeration.RoleUtilisateur;
import com.example.demo.Enumeration.statusApprenant;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "admins")
public class Admin extends Utilisateur{
	public Admin() {
        super();
    }

	public Admin(String email, String motDePasse, RoleUtilisateur role,
            String nom, String prenom) {
		super(email, motDePasse, role, nom, prenom); 
	}
}

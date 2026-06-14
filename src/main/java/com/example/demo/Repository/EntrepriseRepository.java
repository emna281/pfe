package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Utilisateur;

@Repository
public interface EntrepriseRepository extends JpaRepository<Utilisateur, Long>{

}

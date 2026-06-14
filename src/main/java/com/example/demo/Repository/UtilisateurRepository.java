package com.example.demo.Repository;

import org.springframework.data.domain.Pageable; 
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Session;
import com.example.demo.Entity.Utilisateur;
import com.example.demo.Enumeration.RoleUtilisateur;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long>{
	Optional<Utilisateur> findByEmail(String email);
    
    boolean existsByEmail(String email);
    Utilisateur getByEmail(String email);
    
    Optional<Utilisateur> findByEmailAndMotDePasse(String email, String motDePasse);
    
    @Query("""
    	    SELECT u FROM Utilisateur u
    	    WHERE (:role   IS NULL OR u.role   = :role)
    	      AND (:actif  IS NULL OR u.actif  = :actif)
    	      AND (:search IS NULL
    	           OR LOWER(u.nom)    LIKE LOWER(CONCAT('%', CAST(:search AS string), '%'))
    	           OR LOWER(u.prenom) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%'))
    	           OR LOWER(u.email)  LIKE LOWER(CONCAT('%', CAST(:search AS string), '%')))
    	    """)
    	Page<Utilisateur> findByFilters(
    	    @Param("role")   RoleUtilisateur role,
    	    @Param("search") String search,
    	    @Param("actif")  Boolean actif,
    	    Pageable pageable
    	);
   

}

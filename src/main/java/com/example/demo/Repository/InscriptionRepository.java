package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.DTO.Response.InscriptionResponseDTO;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.StatutInscription;

@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long>{
	boolean existsByApprenantIdAndSessionId(Long apprenantId, Long sessionId);
	boolean existsByApprenantAndSession(Apprenant apprenant,Session session);
	
	List<Inscription> findBySessionId(Long sessionId);      
    List<Inscription> findByApprenantId(Long apprenantId);
    List<Inscription> findBySession_IdAndStatut(Long sessionId,StatutInscription statut);
    
    @Query("SELECT COUNT(i) > 0 FROM Inscription i " +
            "WHERE i.apprenant.email = :email " +
            "AND i.session.id = :sessionId")
     boolean existsByApprenantEmailAndSessionId(
         @Param("email") String email,
         @Param("sessionId") Long sessionId);
    
    List<Inscription> findByFacturee(Boolean facturee);
}

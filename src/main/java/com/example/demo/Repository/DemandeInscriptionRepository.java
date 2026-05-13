package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.DemandeInscription;
import com.example.demo.Enumeration.StatutDemande;

@Repository
public interface DemandeInscriptionRepository extends JpaRepository<DemandeInscription, Long> {
	boolean existsByEmailAndSessionId(String email, Long sessionId );
	List<DemandeInscription> findByEmail(String email);
	List<DemandeInscription>findBySessionIdAndStatut (Long sessionId, StatutDemande statut);
	@Query("SELECT COUNT(d) > 0 FROM DemandeInscription d " +
	           "WHERE d.apprenant.email = :email " +
	           "AND d.session.id = :sessionId")
	    boolean existsByApprenantEmailAndSessionId(
	        @Param("email") String email,
	        @Param("sessionId") Long sessionId);
}

package com.example.demo.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Inscription;
import com.example.demo.Entity.Presence;

@Repository
public interface PresenceRepository extends JpaRepository<Presence, Long>{
	 Optional<Presence> findByInscriptionAndJourNumero(
		        Inscription inscription, Integer jourNumero);

	    List<Presence> findByInscription_Session_Id(Long sessionId);

	    List<Presence> findByInscription_Id(Long inscriptionId);

	    List<Presence> findByInscription_Apprenant_Id(Long apprenantId);

	    List<Presence> findByInscription_Session_IdAndJourNumero(
	        Long sessionId, Integer jourNumero);
	    
	    @Query("SELECT p FROM Presence p " +
	    	       "JOIN FETCH p.inscription i " +
	    	       "JOIN FETCH i.apprenant a " +
	    	       "JOIN FETCH i.session s " +
	    	       "WHERE s.id = :sessionId")
	    	List<Presence> findBySessionIdWithDetails(@Param("sessionId") Long sessionId);
}

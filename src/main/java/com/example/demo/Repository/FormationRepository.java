package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Formation;

@Repository
public interface FormationRepository extends JpaRepository<Formation, Long>{
	
	@Query("SELECT DISTINCT f FROM Formation f " +  
			   "LEFT JOIN FETCH f.competences c " +  
			   "WHERE f.id = :id")
		Optional<Formation> findByIdWithCompetences(@Param("id") Long id);
	
	@Query("SELECT DISTINCT f FROM Formation f " +
	           "LEFT JOIN FETCH f.sessions s " +  
	           "WHERE f.id = :id")
	    Optional<Formation> findByIdWithSessions(@Param("id") Long id);
	
	Optional<Formation> findById(Long id);
	
	Optional<Formation> findByCode(String code);
    
    List<Formation> findByActifTrue();
    
    boolean existsByCode(String code);
    
    //List<Formation> findByCompetencesCompetenceNom(String nomCompetence);
    
    List<Formation> findByTitreContainingIgnoreCase(String titre);
    List<Formation> findByArchiveFalse();

}

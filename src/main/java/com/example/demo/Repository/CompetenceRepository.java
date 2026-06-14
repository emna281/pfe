package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Competence;
import com.example.demo.Entity.Formation;

@Repository
public interface CompetenceRepository extends JpaRepository<Competence, Long>{
	
	@Query("SELECT DISTINCT c FROM Competence c " +
	           "LEFT JOIN FETCH c.formations f " +  
	           "WHERE c.id = :id")
	    Optional<Competence> findByIdWithFormation(@Param("id") Long id);
	
	Optional<Competence> findById(Long id);
	
	List<Competence> findByNomIn(List<String> noms);
	
	Optional<Competence> findByCode(String code);
	
	List<Competence> findByCategorie(String categorie);
	
	boolean existsByCode(String code);
	
	@Query("SELECT c.id as id, c.code as code, c.nom as nom, " +
	           "c.description as description, c.categorie as categorie, " +
	           "f.code as formationCode " +
	           "FROM Competence c LEFT JOIN c.formations f " +
	           "WHERE c.id = :id")
	    List<Object[]> findCompetenceWithFormationCodes(@Param("id") Long id);
	    
	    

}

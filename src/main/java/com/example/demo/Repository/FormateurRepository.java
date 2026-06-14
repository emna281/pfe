package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Formateur;

@Repository
public interface FormateurRepository extends JpaRepository<Formateur, Long>{
	@Query("SELECT f FROM Formateur f JOIN f.competencesList c WHERE c = :competence AND f.disponibilite = true")
	List<Formateur> findByCompetenceAndDisponible(@Param("competence") String competence);
	
	Optional<Formateur> findByEmail( String email);

}

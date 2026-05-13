package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Facture;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long>{
	List<Facture> findByArchiveFalse();
	List<Facture> findByArchiveTrue();
	Optional<Facture> findByInscriptionId(Long inscriptionId);
}

package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Paiement;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long>{
	List<Paiement> findByFactureId(Long factureId);
}

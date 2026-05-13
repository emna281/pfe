package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Charge;
import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.StatutCharge;

@Repository
public interface ChargeRepository extends JpaRepository<Charge, Long>{
	Optional<Charge>findById(Long id);
	List<Charge> findBySessionId(Long sessionId);
	List<Charge> findByStatut(StatutCharge statut);
	List<Charge> findBySessionIsNull();
}

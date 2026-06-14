package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.demo.Entity.Planificateur;
@Repository
public interface PlanificateurRepository extends JpaRepository<Planificateur, Long>{
	Optional<Planificateur> findByEmail(String email);

}

package com.example.demo.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Apprenant;


@Repository
public interface ApprenantRepository extends JpaRepository<Apprenant, Long> {
	Optional<Apprenant> findByEmail(String email);
	
}

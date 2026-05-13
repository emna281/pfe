package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Financier;


@Repository
public interface FinancierRepository extends JpaRepository<Financier, Long>{
	Optional<Financier> findByEmail(String email);
	
}

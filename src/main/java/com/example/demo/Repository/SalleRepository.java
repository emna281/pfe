package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Salle;

@Repository
public interface SalleRepository extends JpaRepository<Salle, Long>{

}

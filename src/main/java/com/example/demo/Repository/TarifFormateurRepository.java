package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Session;
import com.example.demo.Entity.TarifFormateur;

@Repository
public interface TarifFormateurRepository extends JpaRepository<TarifFormateur, Long> {

}

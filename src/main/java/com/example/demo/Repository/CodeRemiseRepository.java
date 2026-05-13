package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.CodeRemise;


@Repository
public interface CodeRemiseRepository extends JpaRepository<CodeRemise, Long>{
	Optional<CodeRemise> findByCode(String code);
    List<CodeRemise> findByApprenantId(Long apprenantId);

    boolean existsByApprenantIdAndActifTrueAndUtiliseFalse(Long apprenantId);
    Optional<CodeRemise> findByApprenantIdAndActifTrueAndUtiliseFalse(Long apprenantId);
}

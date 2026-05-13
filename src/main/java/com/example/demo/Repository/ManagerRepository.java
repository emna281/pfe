package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.demo.Entity.Manager;
@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long>{
	Optional<Manager> findByEmail(String email);

}

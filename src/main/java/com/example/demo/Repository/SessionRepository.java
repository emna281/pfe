package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Formation;
import com.example.demo.Entity.Session;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long>{
	Optional<Session>findById(Long id);
	Optional<Session> findByCode(String code);
	List<Session> findByArchiveFalse();
}

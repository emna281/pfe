package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
	List<Note> findByInscriptionSessionId(Long sessionId);
    Optional<Note> findByInscriptionId(Long inscriptionId);
    boolean existsByInscriptionId(Long inscriptionId);
}

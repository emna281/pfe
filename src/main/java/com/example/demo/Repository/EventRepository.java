package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>{
	Optional<Event> getById(Event event);

}

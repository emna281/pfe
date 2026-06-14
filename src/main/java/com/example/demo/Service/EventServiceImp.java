package com.example.demo.Service;

import java.util.List;

import org.apache.catalina.startup.ClassLoaderFactory.Repository;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Event;
import com.example.demo.Repository.EventRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class EventServiceImp implements EventService{
	private final EventRepository repository;
	
	public EventServiceImp(EventRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public List<Event> getAllEvents(){
		return repository.findAll();		
	}
	@Override
	public Event addEvent(Event event) {
		return repository.save(event);
	}
	@Override
	public Event updateEvent(Long id, Event updatedEvent) {
	    Event event = repository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Event not found"));

	    event.setTitle(updatedEvent.getTitle());
	    event.setStart(updatedEvent.getStart());
	    event.setEndDate(updatedEvent.getEndDate());
	    event.setCalendar(updatedEvent.getCalendar());

	    return repository.save(event);
	}
}

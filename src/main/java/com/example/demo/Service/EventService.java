package com.example.demo.Service;

import java.util.List;

import com.example.demo.Entity.Event;

public interface EventService {

	 List<Event> getAllEvents();

	 Event addEvent(Event event);
	 Event updateEvent(Long id, Event updatedEvent);
}

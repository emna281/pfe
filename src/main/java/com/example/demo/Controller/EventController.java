package com.example.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Event;
import com.example.demo.Service.EventService;

@RestController
@RequestMapping("/api/admin/event")
public class EventController {
	private final EventService service;

	public EventController(EventService service) {
		this.service = service;
	}
	
	@GetMapping
    public List<Event> getAllEvents() {
        return service.getAllEvents();
    }

    @PostMapping
    public Event addEvent(@RequestBody Event event) {
        return service.addEvent(event);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return ResponseEntity.ok(service.updateEvent(id, event));
    }
	
}

package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Table(name="events")
@Entity
public class Event {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	 private String title;
	 private String start;
	 private String endDate;
	 private String calendar;
	 
	 
	public Event() {}
	public Event(String title, String start, String end, String calendar) {
		this.title = title;
		this.start = start;
		this.endDate = end;
		this.calendar = calendar;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getCalendar() {
		return calendar;
	}
	public void setCalendar(String calendar) {
		this.calendar = calendar;
	} 
	 

}

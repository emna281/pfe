package com.example.demo.Entity;

import com.example.demo.Enumeration.Evaluation;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="notes")
public class Note {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private Long note;
	
	private Boolean reusit;
	
	@Enumerated(EnumType.STRING)
	private Evaluation evaluation;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inscription_id", nullable = false)
    private Inscription inscription;

	
	
	public Note() {}

	public Note(Long note, Boolean reusit, Evaluation evaluation, Inscription inscription) {
		super();
		this.note = note;
		this.reusit = reusit;
		this.evaluation = evaluation;
		this.inscription = inscription;
	}

	public Long getNote() {
		return note;
	}

	public void setNote(Long note) {
		this.note = note;
	}

	public Boolean getReusit() {
		return reusit;
	}

	public void setReusit(Boolean reusit) {
		this.reusit = reusit;
	}

	public Evaluation getEvaluation() {
		return evaluation;
	}

	public void setEvaluation(Evaluation evaluation) {
		this.evaluation = evaluation;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Inscription getInscription() {
		return inscription;
	}

	public void setInscription(Inscription inscription) {
		this.inscription = inscription;
	}
	
	
}

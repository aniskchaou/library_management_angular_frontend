package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class Writer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String note;
    private String dob;
	private  String died;
	private  String dod;
	private String publications;
	private String bio;
	private String awards;
	private String refrences;

	public Writer() {
	}


	public String getPublications() {
		return publications;
	}

	public void setPublications(String publications) {
		this.publications = publications;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getAwards() {
		return awards;
	}

	public void setAwards(String awards) {
		this.awards = awards;
	}

	public String getRefrences() {
		return refrences;
	}

	public void setRefrences(String refrences) {
		this.refrences = refrences;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getDied() {
		return died;
	}

	public void setDied(String died) {
		this.died = died;
	}

	public String getDod() {
		return dod;
	}

	public void setDod(String dod) {
		this.dod = dod;
	}

	public Writer(String name, String note, String dob, String died, String dod, String publications, String bio, String awards, String refrences) {
		this.name = name;
		this.note = note;
		this.dob = dob;
		this.died = died;
		this.dod = dod;
		this.publications = publications;
		this.bio = bio;
		this.awards = awards;
		this.refrences = refrences;
	}

	public Writer(Long id, String name, String note) {
		super();
		this.id = id;
		this.name = name;
		this.note = note;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

}

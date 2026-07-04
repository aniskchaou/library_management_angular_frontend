package com.dev.delta.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;

@Entity
public class Tag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String name; // Name of the tag

	@Column(nullable = false, unique = true)
	private String slug; // A URL-friendly version of the name

	@Column(nullable = false)
	private boolean published; // Indicates if the tag is published or not

	// Constructors
	public Tag() {
	}

	public Tag(String name, String slug, boolean published) {
		this.name = name;
		this.slug = slug;
		this.published = published;
	}

	// Getters and Setters
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

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public boolean isPublished() {
		return published;
	}

	public void setPublished(boolean published) {
		this.published = published;
	}

	@Override
	public String toString() {
		return "Tag{" +
				"id=" + id +
				", name='" + name + '\'' +
				", slug='" + slug + '\'' +
				", published=" + published +
				'}';
	}
}

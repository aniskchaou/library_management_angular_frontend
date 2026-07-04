package com.dev.delta.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Wastage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@ManyToOne
	@JoinColumn(name = "book_id")
    CatalogItem catalogItem;
	String Note;

	public Wastage() {
		// TODO Auto-generated constructor stub
	}

	public Wastage(CatalogItem catalogItem, String note) {
		super();
		this.catalogItem = catalogItem;
		Note = note;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CatalogItem getBook() {
		return catalogItem;
	}

	public void setBook(CatalogItem catalogItem) {
		this.catalogItem = catalogItem;
	}

	public String getNote() {
		return Note;
	}

	public void setNote(String note) {
		Note = note;
	}

}

package com.dev.delta.entities;

import javax.persistence.*;

/**
 * Book
 * 
 * @author Admin
 *
 */
@Entity
@Table(name = "book")
public class CatalogItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String isbn;
	private String title;
	@ManyToOne
	@JoinColumn(name = "author_id")
	Writer writer;
	private String edition;
	private String edition_year;
	private String photo;
	@ManyToOne
	@JoinColumn(name = "publisher_id")
	Publisher publisher;
	private String publishing_year;
	private String publication_place;
	private String number_of_pages;
	private String notes;
	@ManyToOne
	@JoinColumn(name = "book_status_id")
	private BookStatus status;
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "physical_description_id")
	private PhysicalDescription physicalDescription;
	@ManyToOne
	@JoinColumn(name = "media_type")
	private MediaType mediaType;

	@ManyToOne
	@JoinColumn(name = "department_id")
	private Departement departement;

	@ManyToOne
	@JoinColumn(name = "shelf_id")
	private Shelf shelf;

	@ManyToOne
	@JoinColumn(name = "row_id")
	private Row row;

	public CatalogItem(String isbn, String title, Writer writer, String edition, String edition_year, String photo, Publisher publisher, String publishing_year, String publication_place, String number_of_pages, String notes, BookStatus status, Category category, PhysicalDescription physicalDescription, MediaType mediaType) {
		this.isbn = isbn;
		this.title = title;
		this.writer = writer;
		this.edition = edition;
		this.edition_year = edition_year;
		this.photo = photo;
		this.publisher = publisher;
		this.publishing_year = publishing_year;
		this.publication_place = publication_place;
		this.number_of_pages = number_of_pages;
		this.notes = notes;
		this.status = status;
		this.category = category;
		this.physicalDescription = physicalDescription;
		this.mediaType = mediaType;
	}

	public Departement getDepartement() {
		return departement;
	}

	public void setDepartement(Departement departement) {
		this.departement = departement;
	}

	public Shelf getShelf() {
		return shelf;
	}

	public void setShelf(Shelf shelf) {
		this.shelf = shelf;
	}

	public Row getRow() {
		return row;
	}

	public void setRow(Row row) {
		this.row = row;
	}

	public BookStatus getStatus() {
		return status;
	}

	public void setStatus(BookStatus status) {
		this.status = status;
	}

	public CatalogItem() {
		// TODO Auto-generated constructor stub
	}

	public MediaType getMediaType() {
		return mediaType;
	}

	public void setMediaType(MediaType mediaType) {
		this.mediaType = mediaType;
	}

	public PhysicalDescription getPhysicalDescription() {
		return physicalDescription;
	}

	public void setPhysicalDescription(PhysicalDescription physicalDescription) {
		this.physicalDescription = physicalDescription;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Writer getWriter() {
		return writer;
	}

	public void setWriter(Writer writer) {
		this.writer = writer;
	}

	public String getEdition() {
		return edition;
	}

	public void setEdition(String edition) {
		this.edition = edition;
	}

	public String getEdition_year() {
		return edition_year;
	}

	public void setEdition_year(String edition_year) {
		this.edition_year = edition_year;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Publisher getPublisher() {
		return publisher;
	}

	public void setPublisher(Publisher publisher) {
		this.publisher = publisher;
	}

	public String getPublishing_year() {
		return publishing_year;
	}

	public void setPublishing_year(String publishing_year) {
		this.publishing_year = publishing_year;
	}

	public String getPublication_place() {
		return publication_place;
	}

	public void setPublication_place(String publication_place) {
		this.publication_place = publication_place;
	}

	public String getNumber_of_pages() {
		return number_of_pages;
	}

	public void setNumber_of_pages(String number_of_pages) {
		this.number_of_pages = number_of_pages;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	/** Stored filename of an uploaded PDF (e.g. "book_42.pdf") */
	private String pdf;

	/** External or MARC 856 link to a full-text resource */
	private String link;

	public String getPdf() { return pdf; }
	public void setPdf(String pdf) { this.pdf = pdf; }

	public String getLink() { return link; }
	public void setLink(String link) { this.link = link; }

	@Override
	public String toString() {
		return "Book [id=" + id + ", isbn=" + isbn + ", title=" + title + ", writer=" + writer + ", edition=" + edition
				+ ", edition_year=" + edition_year + ", photo=" + photo + ", publisher=" + publisher
				+ ", publishing_year=" + publishing_year + ", publication_place=" + publication_place
				+ ", number_of_pages=" + number_of_pages + ", notes=" + notes + ", status=" + status + ", category="
				+ category + "]";
	}

}

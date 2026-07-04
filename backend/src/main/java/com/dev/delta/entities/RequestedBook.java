package com.dev.delta.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class RequestedBook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "book_id")
	private CatalogItem catalogItem;
	@ManyToOne
	@JoinColumn(name = "writer_id")
	private Writer writer;
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category ctagory;
	private String edition;
	private String note;
	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	private String status;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public RequestedBook() {
		// TODO Auto-generated constructor stub
	}

	public RequestedBook(CatalogItem catalogItem, Writer writer, Category ctagory, String edition, String note, Member member,
                         String status) {
		super();
		this.catalogItem = catalogItem;
		this.writer = writer;
		this.ctagory = ctagory;
		this.edition = edition;
		this.note = note;
		this.member = member;
		this.status = status;
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

	public Writer getWriter() {
		return writer;
	}

	public void setWriter(Writer writer) {
		this.writer = writer;
	}

	public Category getCtagory() {
		return ctagory;
	}

	public void setCtagory(Category ctagory) {
		this.ctagory = ctagory;
	}

	public String getEdition() {
		return edition;
	}

	public void setEdition(String edition) {
		this.edition = edition;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

}

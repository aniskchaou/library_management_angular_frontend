package com.dev.delta.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Archive {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String name;
	@ManyToOne
	@JoinColumn(name = "writer_id")
	Writer writer;
	String publication;
	@ManyToOne
	@JoinColumn(name = "category_id")
	Category category;
	String code;
	String ISBN;
	String edition;
	String editionYear;
	String quantity;
	String issuedQuantity;
	String RackNo;

	public Archive() {
		// TODO Auto-generated constructor stub
	}

	public Archive(String name, Writer writer, String publication, Category category, String code, String iSBN,
			String edition, String editionYear, String quantity, String issuedQuantity, String rackNo) {
		super();
		this.name = name;
		this.writer = writer;
		this.publication = publication;
		this.category = category;
		this.code = code;
		ISBN = iSBN;
		this.edition = edition;
		this.editionYear = editionYear;
		this.quantity = quantity;
		this.issuedQuantity = issuedQuantity;
		RackNo = rackNo;
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

	public Writer getWriter() {
		return writer;
	}

	public void setWriter(Writer writer) {
		this.writer = writer;
	}

	public String getPublication() {
		return publication;
	}

	public void setPublication(String publication) {
		this.publication = publication;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getISBN() {
		return ISBN;
	}

	public void setISBN(String iSBN) {
		ISBN = iSBN;
	}

	public String getEdition() {
		return edition;
	}

	public void setEdition(String edition) {
		this.edition = edition;
	}

	public String getEditionYear() {
		return editionYear;
	}

	public void setEditionYear(String editionYear) {
		this.editionYear = editionYear;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getIssuedQuantity() {
		return issuedQuantity;
	}

	public void setIssuedQuantity(String issuedQuantity) {
		this.issuedQuantity = issuedQuantity;
	}

	public String getRackNo() {
		return RackNo;
	}

	public void setRackNo(String rackNo) {
		RackNo = rackNo;
	}

}

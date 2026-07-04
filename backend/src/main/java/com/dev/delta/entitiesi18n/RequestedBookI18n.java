package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RequestedBookI18n {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String bookI18n;
	String writerI18n;
	String ctagoryI18n;
	String editionI18n;
	String noteI18n;
	String memberI18n;
	String allTitleI18n;
	String editTitleI18n;
	String addTitleI18n;
	String addButtonI18n;
	String editButtonI18n;
	String resetButtonI18n;
	String closeButtonI18n;
	String langI18n;

	public RequestedBookI18n() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBookI18n() {
		return bookI18n;
	}

	public void setBookI18n(String bookI18n) {
		this.bookI18n = bookI18n;
	}

	public String getWriterI18n() {
		return writerI18n;
	}

	public void setWriterI18n(String writerI18n) {
		this.writerI18n = writerI18n;
	}

	public String getCtagoryI18n() {
		return ctagoryI18n;
	}

	public void setCtagoryI18n(String ctagoryI18n) {
		this.ctagoryI18n = ctagoryI18n;
	}

	public String getEditionI18n() {
		return editionI18n;
	}

	public void setEditionI18n(String editionI18n) {
		this.editionI18n = editionI18n;
	}

	public String getNoteI18n() {
		return noteI18n;
	}

	public void setNoteI18n(String noteI18n) {
		this.noteI18n = noteI18n;
	}

	public String getMemberI18n() {
		return memberI18n;
	}

	public void setMemberI18n(String memberI18n) {
		this.memberI18n = memberI18n;
	}

	public String getAllTitleI18n() {
		return allTitleI18n;
	}

	public void setAllTitleI18n(String allTitleI18n) {
		this.allTitleI18n = allTitleI18n;
	}

	public String getEditTitleI18n() {
		return editTitleI18n;
	}

	public void setEditTitleI18n(String editTitleI18n) {
		this.editTitleI18n = editTitleI18n;
	}

	public String getAddTitleI18n() {
		return addTitleI18n;
	}

	public void setAddTitleI18n(String addTitleI18n) {
		this.addTitleI18n = addTitleI18n;
	}

	public String getAddButtonI18n() {
		return addButtonI18n;
	}

	public void setAddButtonI18n(String addButtonI18n) {
		this.addButtonI18n = addButtonI18n;
	}

	public String getEditButtonI18n() {
		return editButtonI18n;
	}

	public void setEditButtonI18n(String editButtonI18n) {
		this.editButtonI18n = editButtonI18n;
	}

	public String getResetButtonI18n() {
		return resetButtonI18n;
	}

	public void setResetButtonI18n(String resetButtonI18n) {
		this.resetButtonI18n = resetButtonI18n;
	}

	public String getCloseButtonI18n() {
		return closeButtonI18n;
	}

	public void setCloseButtonI18n(String closeButtonI18n) {
		this.closeButtonI18n = closeButtonI18n;
	}

	public String getLangI18n() {
		return langI18n;
	}

	public void setLangI18n(String langI18n) {
		this.langI18n = langI18n;
	}

}

package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class EBookI18n {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String isbnI18n;
	String nameI18n;
	String editionI18n;
	String languageI18n;
	String authorI18n;
	String allTitleI18n;
	String editTitleI18n;
	String addTitleI18n;
	String addButtonI18n;
	String editButtonI18n;
	String resetButtonI18n;
	String closeButtonI18n;
	String langI18n;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIsbnI18n() {
		return isbnI18n;
	}

	public void setIsbnI18n(String isbnI18n) {
		this.isbnI18n = isbnI18n;
	}

	public String getNameI18n() {
		return nameI18n;
	}

	public void setNameI18n(String nameI18n) {
		this.nameI18n = nameI18n;
	}

	public String getEditionI18n() {
		return editionI18n;
	}

	public void setEditionI18n(String editionI18n) {
		this.editionI18n = editionI18n;
	}

	public String getLanguageI18n() {
		return languageI18n;
	}

	public void setLanguageI18n(String languageI18n) {
		this.languageI18n = languageI18n;
	}

	public String getAuthorI18n() {
		return authorI18n;
	}

	public void setAuthorI18n(String authorI18n) {
		this.authorI18n = authorI18n;
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

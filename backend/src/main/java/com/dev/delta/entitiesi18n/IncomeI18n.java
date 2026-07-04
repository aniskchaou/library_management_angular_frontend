package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "incomei18n")
public class IncomeI18n {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	private String nameI18n;
	private String dateI18n;
	private String amountI18n;
	private String noteI18n;
	private String langI18n;

	public IncomeI18n() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNameI18n() {
		return nameI18n;
	}

	public void setNameI18n(String nameI18n) {
		this.nameI18n = nameI18n;
	}

	public String getDateI18n() {
		return dateI18n;
	}

	public void setDateI18n(String dateI18n) {
		this.dateI18n = dateI18n;
	}

	public String getAmountI18n() {
		return amountI18n;
	}

	public void setAmountI18n(String amountI18n) {
		this.amountI18n = amountI18n;
	}

	public String getNoteI18n() {
		return noteI18n;
	}

	public void setNoteI18n(String noteI18n) {
		this.noteI18n = noteI18n;
	}

	public String getLangI18n() {
		return langI18n;
	}

	public void setLangI18n(String langI18n) {
		this.langI18n = langI18n;
	}

}

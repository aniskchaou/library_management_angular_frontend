package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "paymenti18n")
public class PaymentI18n {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	private String nameI18n;
	private String dateI18n;
	private String amountI18n;
	private String noteI18n;
	private String langI18n;
	String allTitleI18n;
	String addTitleI18n;
	String addButtonI18n;
	String resetButtonI18n;
	String closeButtonI18n;

	public PaymentI18n() {
		// TODO Auto-generated constructor stub
	}

	public String getAllTitleI18n() {
		return allTitleI18n;
	}

	public void setAllTitleI18n(String allTitleI18n) {
		this.allTitleI18n = allTitleI18n;
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

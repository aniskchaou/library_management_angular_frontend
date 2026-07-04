package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class SettingsI18n {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String nameI18n;
	String telephoneI18n;
	String addressI18n;
	String faxI18n;
	String allTitleI18n;
	String editTitleI18n;
	String addTitleI18n;
	String addButtonI18n;
	String editButtonI18n;
	String resetButtonI18n;
	String closeButtonI18n;
	String langI18n;
	String languageI18n;
	String authI18n;
	String enableTLS;
	String hostI18n;
	String emailI18n;

	public String getAuthI18n() {
		return authI18n;
	}

	public void setAuthI18n(String authI18n) {
		this.authI18n = authI18n;
	}

	public String getEnableTLS() {
		return enableTLS;
	}

	public void setEnableTLS(String enableTLS) {
		this.enableTLS = enableTLS;
	}

	public String getHostI18n() {
		return hostI18n;
	}

	public void setHostI18n(String hostI18n) {
		this.hostI18n = hostI18n;
	}

	public String getEmailI18n() {
		return emailI18n;
	}

	public void setEmailI18n(String emailI18n) {
		this.emailI18n = emailI18n;
	}

	public String getLanguageI18n() {
		return languageI18n;
	}

	public void setLanguageI18n(String languageI18n) {
		this.languageI18n = languageI18n;
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

	public String getTelephoneI18n() {
		return telephoneI18n;
	}

	public void setTelephoneI18n(String telephoneI18n) {
		this.telephoneI18n = telephoneI18n;
	}

	public String getAddressI18n() {
		return addressI18n;
	}

	public void setAddressI18n(String addressI18n) {
		this.addressI18n = addressI18n;
	}

	public String getFaxI18n() {
		return faxI18n;
	}

	public void setFaxI18n(String faxI18n) {
		this.faxI18n = faxI18n;
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

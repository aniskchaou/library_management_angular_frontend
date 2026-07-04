package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MemberI18n {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String nameI18n;
	String user_typeI18n;
	String type_idI18n;
	String emailI18n;
	String mobileI18n;
	String passwordI18n;
	String addressI18n;
	String statusI18n;
	String allTitleI18n;
	String editTitleI18n;
	String addTitleI18n;
	String addButtonI18n;
	String editButtonI18n;
	String resetButtonI18n;
	String closeButtonI18n;
	String langI18n;

	public MemberI18n() {
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

	public String getUser_typeI18n() {
		return user_typeI18n;
	}

	public void setUser_typeI18n(String user_typeI18n) {
		this.user_typeI18n = user_typeI18n;
	}

	public String getType_idI18n() {
		return type_idI18n;
	}

	public void setType_idI18n(String type_idI18n) {
		this.type_idI18n = type_idI18n;
	}

	public String getEmailI18n() {
		return emailI18n;
	}

	public void setEmailI18n(String emailI18n) {
		this.emailI18n = emailI18n;
	}

	public String getMobileI18n() {
		return mobileI18n;
	}

	public void setMobileI18n(String mobileI18n) {
		this.mobileI18n = mobileI18n;
	}

	public String getPasswordI18n() {
		return passwordI18n;
	}

	public void setPasswordI18n(String passwordI18n) {
		this.passwordI18n = passwordI18n;
	}

	public String getAddressI18n() {
		return addressI18n;
	}

	public void setAddressI18n(String addressI18n) {
		this.addressI18n = addressI18n;
	}

	public String getStatusI18n() {
		return statusI18n;
	}

	public void setStatusI18n(String statusI18n) {
		this.statusI18n = statusI18n;
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

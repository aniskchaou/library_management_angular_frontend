package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CategoryI18n {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String category_nameI18n;
	private String allTitleI18n;
	private String editTitleI18n;
	private String addTitleI18n;
	private String addButtonI18n;
	private String editButtonI18n;
	private String resetButtonI18n;
	private String closeButtonI18n;
	private String reloadI18n;
	private String analyticsI18n;
	private String langI18n;

	public CategoryI18n() {
		// TODO Auto-generated constructor stub
	}

	public String getReloadI18n() {
		return reloadI18n;
	}

	public void setReloadI18n(String reloadI18n) {
		this.reloadI18n = reloadI18n;
	}

	public String getAnalyticsI18n() {
		return analyticsI18n;
	}

	public void setAnalyticsI18n(String analyticsI18n) {
		this.analyticsI18n = analyticsI18n;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategory_nameI18n() {
		return category_nameI18n;
	}

	public void setCategory_nameI18n(String category_nameI18n) {
		this.category_nameI18n = category_nameI18n;
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

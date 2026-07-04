package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "search_book")
public class SearchI18n {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String resultI18n;
	String authorI18n;
	String categoryI18n;
	String bookI18n;
	String langI18n;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getResultI18n() {
		return resultI18n;
	}

	public void setResultI18n(String resultI18n) {
		this.resultI18n = resultI18n;
	}

	public String getAuthorI18n() {
		return authorI18n;
	}

	public void setAuthorI18n(String authorI18n) {
		this.authorI18n = authorI18n;
	}

	public String getCategoryI18n() {
		return categoryI18n;
	}

	public void setCategoryI18n(String categoryI18n) {
		this.categoryI18n = categoryI18n;
	}

	public String getBookI18n() {
		return bookI18n;
	}

	public void setBookI18n(String bookI18n) {
		this.bookI18n = bookI18n;
	}

	public String getLangI18n() {
		return langI18n;
	}

	public void setLangI18n(String langI18n) {
		this.langI18n = langI18n;
	}

}

package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "booki18n")
public class BookI18n {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String isbnI18n;
	private String titleI18n;
	private String authorI18n;
	private String editionI18n;
	private String edition_yearI18n;
	private String photoI18n;
	private String publisherI18n;
	private String publishing_yearI18n;
	private String publication_placeI18n;
	private String number_of_pagesI18n;
	private String notesI18n;
	private String allTitleI18n;
	private String editTitleI18n;
	private String addTitleI18n;
	private String addButtonI18n;
	private String editButtonI18n;
	private String resetButtonI18n;
	private String closeButtonI18n;
	private String langI18n;
	private String categoryI18n;
	private String showButtonI18n;
	private String refreshButtonI18n;
	private String summaryButtonI18n;
	private String filtersI18n;
	private String groupByI18n;
	private String filterI18n;

	public String getFiltersI18n() {
		return filtersI18n;
	}

	public void setFiltersI18n(String filtersI18n) {
		this.filtersI18n = filtersI18n;
	}

	public String getGroupByI18n() {
		return groupByI18n;
	}

	public void setGroupByI18n(String groupByI18n) {
		this.groupByI18n = groupByI18n;
	}

	public String getShowButtonI18n() {
		return showButtonI18n;
	}

	public void setShowButtonI18n(String showButtonI18n) {
		this.showButtonI18n = showButtonI18n;
	}

	public String getRefreshButtonI18n() {
		return refreshButtonI18n;
	}

	public void setRefreshButtonI18n(String refreshButtonI18n) {
		this.refreshButtonI18n = refreshButtonI18n;
	}

	public String getSummaryButtonI18n() {
		return summaryButtonI18n;
	}

	public void setSummaryButtonI18n(String summaryButtonI18n) {
		this.summaryButtonI18n = summaryButtonI18n;
	}

	public String getFilterI18n() {
		return filterI18n;
	}

	public void setFilterI18n(String filterI18n) {
		this.filterI18n = filterI18n;
	}

	public String getCategoryI18n() {
		return categoryI18n;
	}

	public void setCategoryI18n(String categoryI18n) {
		this.categoryI18n = categoryI18n;
	}

	public BookI18n() {
		// TODO Auto-generated constructor stub
	}

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

	public String getTitleI18n() {
		return titleI18n;
	}

	public void setTitleI18n(String titleI18n) {
		this.titleI18n = titleI18n;
	}

	public String getAuthorI18n() {
		return authorI18n;
	}

	public void setAuthorI18n(String authorI18n) {
		this.authorI18n = authorI18n;
	}

	public String getEditionI18n() {
		return editionI18n;
	}

	public void setEditionI18n(String editionI18n) {
		this.editionI18n = editionI18n;
	}

	public String getEdition_yearI18n() {
		return edition_yearI18n;
	}

	public void setEdition_yearI18n(String edition_yearI18n) {
		this.edition_yearI18n = edition_yearI18n;
	}

	public String getPhotoI18n() {
		return photoI18n;
	}

	public void setPhotoI18n(String photoI18n) {
		this.photoI18n = photoI18n;
	}

	public String getPublisherI18n() {
		return publisherI18n;
	}

	public void setPublisherI18n(String publisherI18n) {
		this.publisherI18n = publisherI18n;
	}

	public String getPublishing_yearI18n() {
		return publishing_yearI18n;
	}

	public void setPublishing_yearI18n(String publishing_yearI18n) {
		this.publishing_yearI18n = publishing_yearI18n;
	}

	public String getPublication_placeI18n() {
		return publication_placeI18n;
	}

	public void setPublication_placeI18n(String publication_placeI18n) {
		this.publication_placeI18n = publication_placeI18n;
	}

	public String getNumber_of_pagesI18n() {
		return number_of_pagesI18n;
	}

	public void setNumber_of_pagesI18n(String number_of_pagesI18n) {
		this.number_of_pagesI18n = number_of_pagesI18n;
	}

	public String getNotesI18n() {
		return notesI18n;
	}

	public void setNotesI18n(String notesI18n) {
		this.notesI18n = notesI18n;
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

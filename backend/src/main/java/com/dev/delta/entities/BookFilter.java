package com.dev.delta.entities;

/**
 * BookFilter
 * 
 * @author Admin
 *
 */
public class BookFilter {
	private String edition_year;
	private String publishing_year;
	private String publishing_place;
	private String number_of_pages;

	public BookFilter() {
		// TODO Auto-generated constructor stub
	}

	public String getEdition_year() {
		return edition_year;
	}

	public void setEdition_year(String edition_year) {
		this.edition_year = edition_year;
	}

	public String getPublishing_year() {
		return publishing_year;
	}

	public void setPublishing_year(String publishing_year) {
		this.publishing_year = publishing_year;
	}

	public String getPublishing_place() {
		return publishing_place;
	}

	public void setPublishing_place(String publishing_place) {
		this.publishing_place = publishing_place;
	}

	public String getNumber_of_pages() {
		return number_of_pages;
	}

	public void setNumber_of_pages(String number_of_pages) {
		this.number_of_pages = number_of_pages;
	}

}

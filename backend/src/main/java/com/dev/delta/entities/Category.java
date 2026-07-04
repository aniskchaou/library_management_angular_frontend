package com.dev.delta.entities;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Category
 * 
 * @author Admin
 *
 */
@Entity
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String category_name;
	private String image_name;
	@Column(name = "picByte", length = 1000)
	private byte[] image;
	private boolean published;
	private String slug;

	public boolean isPublished() {
		return published;
	}

	public void setPublished(boolean published) {
		this.published = published;
	}

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public Category() {
		// TODO Auto-generated constructor stub
	}

	public Category(Long id, String category_name) {
		super();
		this.id = id;
		this.category_name = category_name;
	}

	public String getImage_name() {
		return image_name;
	}

	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", category_name=" + category_name + ", image_name=" + image_name + ", image="
				+ Arrays.toString(image) + "]";
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Category(String category_name) {
		super();
		this.category_name = category_name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

}

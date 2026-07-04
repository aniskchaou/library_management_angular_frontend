package com.dev.delta.analytics;

import java.util.List;

public class Model2D {
	String name;
	List<Model> series;

	public Model2D() {
		// TODO Auto-generated constructor stub
	}

	public Model2D(String name, List<Model> series) {
		super();
		this.name = name;
		this.series = series;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Model> getSeries() {
		return series;
	}

	public void setSeries(List<Model> series) {
		this.series = series;
	}

}

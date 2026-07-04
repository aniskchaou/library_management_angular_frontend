package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class PhysicalDescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int height; // Height in cm

    @Column(nullable = false)
    private int width; // Width in cm

    @Column(nullable = false)
    private int thickness; // Thickness in cm

    @Column(nullable = false)
    private int weight; // Weight in grams

    @Column
    private Integer pageCount; // Number of pages (optional)

    @Column
    private String bindingType; // Type of binding (e.g., hardcover, paperback)

    // Constructors
    public PhysicalDescription() {
    }

    public PhysicalDescription(int height, int width, int thickness, int weight, Integer pageCount, String bindingType) {
        this.height = height;
        this.width = width;
        this.thickness = thickness;
        this.weight = weight;
        this.pageCount = pageCount;
        this.bindingType = bindingType;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getThickness() {
        return thickness;
    }

    public void setThickness(int thickness) {
        this.thickness = thickness;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public String getBindingType() {
        return bindingType;
    }

    public void setBindingType(String bindingType) {
        this.bindingType = bindingType;
    }

    @Override
    public String toString() {
        return "PhysicalDescription{" +
                "id=" + id +
                ", height=" + height +
                ", width=" + width +
                ", thickness=" + thickness +
                ", weight=" + weight +
                ", pageCount=" + pageCount +
                ", bindingType='" + bindingType + '\'' +
                '}';
    }
}


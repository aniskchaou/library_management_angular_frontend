package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class BarCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String isbn; // ISBN associated with the barcode

    @Column(nullable = false)
    private String type; // Type of barcode (e.g., Code 128)

    @Column(nullable = false)
    private int width; // Width of the barcode image

    @Column(nullable = false)
    private int height; // Height of the barcode image

    @Column(nullable = false)
    private boolean displayValue; // Whether to display the value below the barcode

    @Column(nullable = false)
    private String font; // Font used for the display value

    @Column(nullable = false)
    private String color; // Color of the barcode

    @Column(nullable = false)
    private int margin; // Margin around the barcode

    @Column(nullable = false)
    private int rotation; // Rotation angle of the barcode

    // Constructors
    public BarCode() {
    }

    public BarCode(String isbn, String type, int width, int height, boolean displayValue, String font, String color, int margin, int rotation) {
        this.isbn = isbn;
        this.type = type;
        this.width = width;
        this.height = height;
        this.displayValue = displayValue;
        this.font = font;
        this.color = color;
        this.margin = margin;
        this.rotation = rotation;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public boolean isDisplayValue() {
        return displayValue;
    }

    public void setDisplayValue(boolean displayValue) {
        this.displayValue = displayValue;
    }

    public String getFont() {
        return font;
    }

    public void setFont(String font) {
        this.font = font;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getMargin() {
        return margin;
    }

    public void setMargin(int margin) {
        this.margin = margin;
    }

    public int getRotation() {
        return rotation;
    }

    public void setRotation(int rotation) {
        this.rotation = rotation;
    }

    @Override
    public String toString() {
        return "BarCode{" +
                "id=" + id +
                ", isbn='" + isbn + '\'' +
                ", type='" + type + '\'' +
                ", width=" + width +
                ", height=" + height +
                ", displayValue=" + displayValue +
                ", font='" + font + '\'' +
                ", color='" + color + '\'' +
                ", margin=" + margin +
                ", rotation=" + rotation +
                '}';
    }
}


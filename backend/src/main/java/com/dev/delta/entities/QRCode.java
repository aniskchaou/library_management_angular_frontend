package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class QRCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String isbn; // ISBN associated with the QR code

    @Column(nullable = false)
    private int width; // Width of the QR code image

    @Column(nullable = false)
    private int height; // Height of the QR code image

    @Column(nullable = false)
    private int margin; // Margin around the QR code image

    // Constructors
    public QRCode() {
    }

    public QRCode(String isbn, int width, int height, int margin) {
        this.isbn = isbn;
        this.width = width;
        this.height = height;
        this.margin = margin;
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

    public int getMargin() {
        return margin;
    }

    public void setMargin(int margin) {
        this.margin = margin;
    }

    @Override
    public String toString() {
        return "QRCode{" +
                "id=" + id +
                ", isbn='" + isbn + '\'' +
                ", width=" + width +
                ", height=" + height +
                ", margin=" + margin +
                '}';
    }
}


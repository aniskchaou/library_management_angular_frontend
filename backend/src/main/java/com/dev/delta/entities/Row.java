package com.dev.delta.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
public class Row {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String rowName;

    @Column(nullable = false)
    private int position;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shelf", nullable = false)
    @JsonIgnoreProperties({"rows", "department"})
    private Shelf shelf;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department", nullable = false)
    @JsonIgnoreProperties({"shelves","rows"})
    private Departement department;

    // Getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRowName() {
        return rowName;
    }

    public void setRowName(String rowName) {
        this.rowName = rowName;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public Shelf getShelf() {
        return shelf;
    }

    public void setShelf(Shelf shelf) {
        this.shelf = shelf;
    }

    public Departement getDepartment() {
        return department;
    }

    public void setDepartment(Departement department) {
        this.department = department;
    }
}


package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class NoticeTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title; // Title of the notice template

    @Column(nullable = false, length = 2000)
    private String contentTemplate; // Content template for the notice

    // Constructors
    public NoticeTemplate() {
    }

    public NoticeTemplate(String title, String contentTemplate) {
        this.title = title;
        this.contentTemplate = contentTemplate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContentTemplate() {
        return contentTemplate;
    }

    public void setContentTemplate(String contentTemplate) {
        this.contentTemplate = contentTemplate;
    }

    @Override
    public String toString() {
        return "NoticeTemplate{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", contentTemplate='" + contentTemplate + '\'' +
                '}';
    }
}


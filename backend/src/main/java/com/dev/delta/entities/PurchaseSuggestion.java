package com.dev.delta.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class PurchaseSuggestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = true)
    @JsonIgnore
    private Writer author;

    @Column(nullable = false)
    private LocalDate copyrightDate;

    @Column(nullable = false)
    private String isbnIssnOtherStandardNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publisher_id", nullable = true)
    @JsonIgnore
    private Publisher publisher;

    @Column(nullable = false)
    private String publicationPlace;

    @Column
    private String collectionTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "media_type_id", nullable = true)
    @JsonIgnore
    private MediaType mediaType;

    @Column(nullable = false)
    private String reasonForSuggestion;

    @Column(length = 2000)
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fund_id", nullable = true)
    @JsonIgnore
    private Fund fund;


    private Boolean showInactive;

    @Column(nullable = false)
    private Integer copies;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Double total;

    String  status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Getters and setters

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

    public Writer getAuthor() {
        return author;
    }

    public void setAuthor(Writer author) {
        this.author = author;
    }

    public LocalDate getCopyrightDate() {
        return copyrightDate;
    }

    public void setCopyrightDate(LocalDate copyrightDate) {
        this.copyrightDate = copyrightDate;
    }

    public String getIsbnIssnOtherStandardNumber() {
        return isbnIssnOtherStandardNumber;
    }

    public void setIsbnIssnOtherStandardNumber(String isbnIssnOtherStandardNumber) {
        this.isbnIssnOtherStandardNumber = isbnIssnOtherStandardNumber;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public String getPublicationPlace() {
        return publicationPlace;
    }

    public void setPublicationPlace(String publicationPlace) {
        this.publicationPlace = publicationPlace;
    }

    public String getCollectionTitle() {
        return collectionTitle;
    }

    public void setCollectionTitle(String collectionTitle) {
        this.collectionTitle = collectionTitle;
    }

    public MediaType getMediaType() {
        return mediaType;
    }

    public void setMediaType(MediaType mediaType) {
        this.mediaType = mediaType;
    }

    public String getReasonForSuggestion() {
        return reasonForSuggestion;
    }

    public void setReasonForSuggestion(String reasonForSuggestion) {
        this.reasonForSuggestion = reasonForSuggestion;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Fund getFund() {
        return fund;
    }

    public void setFund(Fund fund) {
        this.fund = fund;
    }

    public Boolean getShowInactive() {
        return showInactive;
    }

    public void setShowInactive(Boolean showInactive) {
        this.showInactive = showInactive;
    }

    public Integer getCopies() {
        return copies;
    }

    public void setCopies(Integer copies) {
        this.copies = copies;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }


}


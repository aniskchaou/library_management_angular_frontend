package com.dev.delta.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MediaType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imageUrl;
    private String name;
    private String code;
    private String parentCode;
    private String searchCategory;
    private boolean notForLoan;
    private double rentalCharge;
    private double dailyRentalCharge;
    private double hourlyRentalCharge;
    private double defaultReplacementCost;
    private double processingFee;
    private String checkinMessage;
    private String libraryLimitations;

    // Default constructor
    public MediaType() {
    }

    // Parameterized constructor
    public MediaType(String imageUrl, String name, String code, String parentCode,
                     String searchCategory, boolean notForLoan, double rentalCharge,
                     double dailyRentalCharge, double hourlyRentalCharge,
                     double defaultReplacementCost, double processingFee,
                     String checkinMessage, String libraryLimitations) {
        this.imageUrl = imageUrl;
        this.name = name;
        this.code = code;
        this.parentCode = parentCode;
        this.searchCategory = searchCategory;
        this.notForLoan = notForLoan;
        this.rentalCharge = rentalCharge;
        this.dailyRentalCharge = dailyRentalCharge;
        this.hourlyRentalCharge = hourlyRentalCharge;
        this.defaultReplacementCost = defaultReplacementCost;
        this.processingFee = processingFee;
        this.checkinMessage = checkinMessage;
        this.libraryLimitations = libraryLimitations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getters and setters
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getParentCode() {
        return parentCode;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode;
    }

    public String getSearchCategory() {
        return searchCategory;
    }

    public void setSearchCategory(String searchCategory) {
        this.searchCategory = searchCategory;
    }

    public boolean isNotForLoan() {
        return notForLoan;
    }

    public void setNotForLoan(boolean notForLoan) {
        this.notForLoan = notForLoan;
    }

    public double getRentalCharge() {
        return rentalCharge;
    }

    public void setRentalCharge(double rentalCharge) {
        this.rentalCharge = rentalCharge;
    }

    public double getDailyRentalCharge() {
        return dailyRentalCharge;
    }

    public void setDailyRentalCharge(double dailyRentalCharge) {
        this.dailyRentalCharge = dailyRentalCharge;
    }

    public double getHourlyRentalCharge() {
        return hourlyRentalCharge;
    }

    public void setHourlyRentalCharge(double hourlyRentalCharge) {
        this.hourlyRentalCharge = hourlyRentalCharge;
    }

    public double getDefaultReplacementCost() {
        return defaultReplacementCost;
    }

    public void setDefaultReplacementCost(double defaultReplacementCost) {
        this.defaultReplacementCost = defaultReplacementCost;
    }

    public double getProcessingFee() {
        return processingFee;
    }

    public void setProcessingFee(double processingFee) {
        this.processingFee = processingFee;
    }

    public String getCheckinMessage() {
        return checkinMessage;
    }

    public void setCheckinMessage(String checkinMessage) {
        this.checkinMessage = checkinMessage;
    }

    public String getLibraryLimitations() {
        return libraryLimitations;
    }

    public void setLibraryLimitations(String libraryLimitations) {
        this.libraryLimitations = libraryLimitations;
    }

    @Override
    public String toString() {
        return "LibraryItem{" +
                "imageUrl='" + imageUrl + '\'' +
                ", description='" + name + '\'' +
                ", code='" + code + '\'' +
                ", parentCode='" + parentCode + '\'' +
                ", searchCategory='" + searchCategory + '\'' +
                ", notForLoan=" + notForLoan +
                ", rentalCharge=" + rentalCharge +
                ", dailyRentalCharge=" + dailyRentalCharge +
                ", hourlyRentalCharge=" + hourlyRentalCharge +
                ", defaultReplacementCost=" + defaultReplacementCost +
                ", processingFee=" + processingFee +
                ", checkinMessage='" + checkinMessage + '\'' +
                ", libraryLimitations='" + libraryLimitations + '\'' +
                '}';
    }
}

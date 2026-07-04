package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class CirculationSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double finePerDay; // Fine per day in dollars

    @Column(nullable = false)
    private double maxFine; // Maximum fine in dollars

    @Column(nullable = false)
    private String itemType; // Type of item (e.g., Book, DVD)

    @Column(nullable = false)
    private int loanPeriod; // Loan period in days

    @Column(nullable = false)
    private int renewalsAllowed; // Number of renewals allowed

    @Column(nullable = false)
    private boolean holdsAllowed; // Whether holds are allowed

    // Constructors
    public CirculationSettings() {
    }

    public CirculationSettings(double finePerDay, double maxFine, String itemType,
                               int loanPeriod, int renewalsAllowed, boolean holdsAllowed) {
        this.finePerDay = finePerDay;
        this.maxFine = maxFine;
        this.itemType = itemType;
        this.loanPeriod = loanPeriod;
        this.renewalsAllowed = renewalsAllowed;
        this.holdsAllowed = holdsAllowed;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getFinePerDay() {
        return finePerDay;
    }

    public void setFinePerDay(double finePerDay) {
        this.finePerDay = finePerDay;
    }

    public double getMaxFine() {
        return maxFine;
    }

    public void setMaxFine(double maxFine) {
        this.maxFine = maxFine;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public int getLoanPeriod() {
        return loanPeriod;
    }

    public void setLoanPeriod(int loanPeriod) {
        this.loanPeriod = loanPeriod;
    }

    public int getRenewalsAllowed() {
        return renewalsAllowed;
    }

    public void setRenewalsAllowed(int renewalsAllowed) {
        this.renewalsAllowed = renewalsAllowed;
    }

    public boolean isHoldsAllowed() {
        return holdsAllowed;
    }

    public void setHoldsAllowed(boolean holdsAllowed) {
        this.holdsAllowed = holdsAllowed;
    }

    @Override
    public String toString() {
        return "CirculationSettings{" +
                "id=" + id +
                ", finePerDay=" + finePerDay +
                ", maxFine=" + maxFine +
                ", itemType='" + itemType + '\'' +
                ", loanPeriod=" + loanPeriod +
                ", renewalsAllowed=" + renewalsAllowed +
                ", holdsAllowed=" + holdsAllowed +
                '}';
    }
}


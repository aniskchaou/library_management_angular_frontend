package com.dev.delta.entities;

import javax.persistence.Embeddable;

@Embeddable
public class InvoicePrice {
    private Double rupees;
    private Double dollars;
    private Double euros;

    // Getters and setters


    public Double getRupees() {
        return rupees;
    }

    public void setRupees(Double rupees) {
        this.rupees = rupees;
    }

    public Double getDollars() {
        return dollars;
    }

    public void setDollars(Double dollars) {
        this.dollars = dollars;
    }

    public Double getEuros() {
        return euros;
    }

    public void setEuros(Double euros) {
        this.euros = euros;
    }
}


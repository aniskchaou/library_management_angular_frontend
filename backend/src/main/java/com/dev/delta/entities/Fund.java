package com.dev.delta.entities;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

@Entity
public class Fund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String fundCode;

    @Column(nullable = false)
    private String fundName;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private Integer warningAtPercentage;

    @Column(nullable = false)
    private Double warningAtAmount;

    @Column(nullable = false)
    private String owner;

    @Column(length = 1000)
    private String notes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "budget_id", nullable = true)
    //@JsonIgnore
    //@JsonManagedReference
    private Budget budget;

    // Getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }

    public String getFundName() {
        return fundName;
    }

    public void setFundName(String fundName) {
        this.fundName = fundName;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Integer getWarningAtPercentage() {
        return warningAtPercentage;
    }

    public void setWarningAtPercentage(Integer warningAtPercentage) {
        this.warningAtPercentage = warningAtPercentage;
    }

    public Double getWarningAtAmount() {
        return warningAtAmount;
    }

    public void setWarningAtAmount(Double warningAtAmount) {
        this.warningAtAmount = warningAtAmount;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Budget getBudget() {
        return budget;
    }

    public void setBudget(Budget budget) {
        this.budget = budget;
    }
}


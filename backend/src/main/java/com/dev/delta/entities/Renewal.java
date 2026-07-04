package com.dev.delta.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Renewal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checkout_id", nullable = false)
    private Checkout checkout; // The checkout record being renewed

    @Column(nullable = false)
    private LocalDateTime newDueDate; // New due date after renewal

    @Column(length = 1000)
    private String notes; // Optional notes about the renewal

    // Constructors
    public Renewal() {
    }

    public Renewal(Checkout checkout, LocalDateTime newDueDate, String notes) {
        this.checkout = checkout;
        this.newDueDate = newDueDate;
        this.notes = notes;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Checkout getCheckout() {
        return checkout;
    }

    public void setCheckout(Checkout checkout) {
        this.checkout = checkout;
    }

    public LocalDateTime getNewDueDate() {
        return newDueDate;
    }

    public void setNewDueDate(LocalDateTime newDueDate) {
        this.newDueDate = newDueDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Renewal{" +
                "id=" + id +
                ", checkout=" + checkout +
                ", newDueDate=" + newDueDate +
                ", notes='" + notes + '\'' +
                '}';
    }
}


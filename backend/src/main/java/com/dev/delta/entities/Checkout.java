package com.dev.delta.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Checkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private CatalogItem item; // The catalog item being checked out

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member; // The member borrowing the item

    @Column(nullable = false)
    private LocalDateTime checkoutDate; // Date and time of checkout

    @Column(nullable = false)
    private LocalDateTime dueDate; // Due date for the item to be returned

    @Column(length = 1000)
    private String notes; // Optional notes about the checkout

    // Constructors
    public Checkout() {
    }

    public Checkout(CatalogItem item, Member member, LocalDateTime checkoutDate, LocalDateTime dueDate, String notes) {
        this.item = item;
        this.member = member;
        this.checkoutDate = checkoutDate;
        this.dueDate = dueDate;
        this.notes = notes;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CatalogItem getItem() {
        return item;
    }

    public void setItem(CatalogItem item) {
        this.item = item;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public LocalDateTime getCheckoutDate() {
        return checkoutDate;
    }

    public void setCheckoutDate(LocalDateTime checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Checkout{" +
                "id=" + id +
                ", item=" + item +
                ", member=" + member +
                ", checkoutDate=" + checkoutDate +
                ", dueDate=" + dueDate +
                ", notes='" + notes + '\'' +
                '}';
    }
}


package com.dev.delta.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Checkin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private CatalogItem item; // The catalog item being checked in

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member; // The member returning the item

    @Column(nullable = false)
    private LocalDateTime checkinDate; // Date and time of check-in

    @Column(length = 1000)
    private String notes; // Optional notes about the check-in

    // Constructors
    public Checkin() {
    }

    public Checkin(CatalogItem item, Member member, LocalDateTime checkinDate, String notes) {
        this.item = item;
        this.member = member;
        this.checkinDate = checkinDate;
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

    public LocalDateTime getCheckinDate() {
        return checkinDate;
    }

    public void setCheckinDate(LocalDateTime checkinDate) {
        this.checkinDate = checkinDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Checkin{" +
                "id=" + id +
                ", item=" + item +
                ", member=" + member +
                ", checkinDate=" + checkinDate +
                ", notes='" + notes + '\'' +
                '}';
    }
}


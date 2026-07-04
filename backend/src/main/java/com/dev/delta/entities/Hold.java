package com.dev.delta.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Hold {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "catalog_item_id", nullable = false)
    private CatalogItem catalogItem; // The item being held

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member; // The member requesting the hold

    @Column(nullable = false)
    private LocalDateTime holdDate; // Date and time when the hold was placed

    @Column(nullable = true)
    private LocalDateTime notifyDate; // Optional date when the member should be notified (if the item becomes available)

    @Column(length = 1000)
    private String notes; // Optional notes about the hold

    // Constructors
    public Hold() {
    }

    public Hold(CatalogItem catalogItem, Member member, LocalDateTime holdDate, LocalDateTime notifyDate, String notes) {
        this.catalogItem = catalogItem;
        this.member = member;
        this.holdDate = holdDate;
        this.notifyDate = notifyDate;
        this.notes = notes;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CatalogItem getCatalogItem() {
        return catalogItem;
    }

    public void setCatalogItem(CatalogItem catalogItem) {
        this.catalogItem = catalogItem;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public LocalDateTime getHoldDate() {
        return holdDate;
    }

    public void setHoldDate(LocalDateTime holdDate) {
        this.holdDate = holdDate;
    }

    public LocalDateTime getNotifyDate() {
        return notifyDate;
    }

    public void setNotifyDate(LocalDateTime notifyDate) {
        this.notifyDate = notifyDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Hold{" +
                "id=" + id +
                ", catalogItem=" + catalogItem +
                ", member=" + member +
                ", holdDate=" + holdDate +
                ", notifyDate=" + notifyDate +
                ", notes='" + notes + '\'' +
                '}';
    }
}


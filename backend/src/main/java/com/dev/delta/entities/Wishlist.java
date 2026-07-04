package com.dev.delta.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id")
    private CatalogItem catalogItem;

    private LocalDate addedDate;

    private boolean notifyWhenAvailable;

    // ── Getters / Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Member getMember() { return member; }
    public void setMember(Member member) { this.member = member; }

    public CatalogItem getCatalogItem() { return catalogItem; }
    public void setCatalogItem(CatalogItem catalogItem) { this.catalogItem = catalogItem; }

    public LocalDate getAddedDate() { return addedDate; }
    public void setAddedDate(LocalDate addedDate) { this.addedDate = addedDate; }

    public boolean isNotifyWhenAvailable() { return notifyWhenAvailable; }
    public void setNotifyWhenAvailable(boolean notifyWhenAvailable) { this.notifyWhenAvailable = notifyWhenAvailable; }
}

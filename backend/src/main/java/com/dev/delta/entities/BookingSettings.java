package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class BookingSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int bookingTime; // Default circulation duration in days

    @Column(nullable = false)
    private int bookingQuota; // Combined maximum number of items a member can request/checkout/loan at a time

    @Column(nullable = false)
    private boolean enableMemberCheckouts; // Whether members can perform self checkouts

    @Column(nullable = false)
    private boolean enableMemberCheckIns; // Whether members can perform self check-ins

    @Column(nullable = false)
    private boolean enableMemberCheckInsForOverdueItems; // Whether members can return overdue items themselves


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_type_id", nullable = false)
    private MemberType member; // The type of members who can perform self checkouts and check-ins

    @Column(nullable = false)
    private int checkoutTime; // Default checkout duration in days

    @Column(nullable = false)
    private int checkoutLimit; // Maximum checkout duration in days for self checkout

    @Column(nullable = false)
    private int checkoutQuota; // Maximum number of items a member can check out

    // Constructors
    public BookingSettings() {
    }

    public BookingSettings(int bookingTime, int bookingQuota, boolean enableMemberCheckouts,
                           boolean enableMemberCheckIns, boolean enableMemberCheckInsForOverdueItems,
                           MemberType member, int checkoutTime, int checkoutLimit, int checkoutQuota) {
        this.bookingTime = bookingTime;
        this.bookingQuota = bookingQuota;
        this.enableMemberCheckouts = enableMemberCheckouts;
        this.enableMemberCheckIns = enableMemberCheckIns;
        this.enableMemberCheckInsForOverdueItems = enableMemberCheckInsForOverdueItems;
        this.member = member;
        this.checkoutTime = checkoutTime;
        this.checkoutLimit = checkoutLimit;
        this.checkoutQuota = checkoutQuota;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(int bookingTime) {
        this.bookingTime = bookingTime;
    }

    public int getBookingQuota() {
        return bookingQuota;
    }

    public void setBookingQuota(int bookingQuota) {
        this.bookingQuota = bookingQuota;
    }

    public boolean isEnableMemberCheckouts() {
        return enableMemberCheckouts;
    }

    public void setEnableMemberCheckouts(boolean enableMemberCheckouts) {
        this.enableMemberCheckouts = enableMemberCheckouts;
    }

    public boolean isEnableMemberCheckIns() {
        return enableMemberCheckIns;
    }

    public void setEnableMemberCheckIns(boolean enableMemberCheckIns) {
        this.enableMemberCheckIns = enableMemberCheckIns;
    }

    public boolean isEnableMemberCheckInsForOverdueItems() {
        return enableMemberCheckInsForOverdueItems;
    }

    public void setEnableMemberCheckInsForOverdueItems(boolean enableMemberCheckInsForOverdueItems) {
        this.enableMemberCheckInsForOverdueItems = enableMemberCheckInsForOverdueItems;
    }

    public MemberType getMember() {
        return member;
    }

    public void setMember(MemberType member) {
        this.member = member;
    }

    public int getCheckoutTime() {
        return checkoutTime;
    }

    public void setCheckoutTime(int checkoutTime) {
        this.checkoutTime = checkoutTime;
    }

    public int getCheckoutLimit() {
        return checkoutLimit;
    }

    public void setCheckoutLimit(int checkoutLimit) {
        this.checkoutLimit = checkoutLimit;
    }

    public int getCheckoutQuota() {
        return checkoutQuota;
    }

    public void setCheckoutQuota(int checkoutQuota) {
        this.checkoutQuota = checkoutQuota;
    }

    @Override
    public String toString() {
        return "BookingSettings{" +
                "id=" + id +
                ", bookingTime=" + bookingTime +
                ", bookingQuota=" + bookingQuota +
                ", enableMemberCheckouts=" + enableMemberCheckouts +
                ", enableMemberCheckIns=" + enableMemberCheckIns +
                ", enableMemberCheckInsForOverdueItems=" + enableMemberCheckInsForOverdueItems +
                ", member=" + member +
                ", checkoutTime=" + checkoutTime +
                ", checkoutLimit=" + checkoutLimit +
                ", checkoutQuota=" + checkoutQuota +
                '}';
    }
}


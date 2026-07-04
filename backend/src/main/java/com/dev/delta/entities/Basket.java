package com.dev.delta.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String basketName;

    @Column(nullable = false)
    private String billingPlace;

    @Column(nullable = false)
    private String deliveryPlace;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vendor_id", nullable = false)

    private Vendor vendor;

    @Column(length = 2000)
    private String internalNote;

    @Column(length = 2000)
    private String vendorNote;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createItemsWhen;

    // Getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBasketName() {
        return basketName;
    }

    public void setBasketName(String basketName) {
        this.basketName = basketName;
    }

    public String getBillingPlace() {
        return billingPlace;
    }

    public void setBillingPlace(String billingPlace) {
        this.billingPlace = billingPlace;
    }

    public String getDeliveryPlace() {
        return deliveryPlace;
    }

    public void setDeliveryPlace(String deliveryPlace) {
        this.deliveryPlace = deliveryPlace;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public String getInternalNote() {
        return internalNote;
    }

    public void setInternalNote(String internalNote) {
        this.internalNote = internalNote;
    }

    public String getVendorNote() {
        return vendorNote;
    }

    public void setVendorNote(String vendorNote) {
        this.vendorNote = vendorNote;
    }

    public Date getCreateItemsWhen() {
        return createItemsWhen;
    }

    public void setCreateItemsWhen(Date createItemsWhen) {
        this.createItemsWhen = createItemsWhen;
    }
}


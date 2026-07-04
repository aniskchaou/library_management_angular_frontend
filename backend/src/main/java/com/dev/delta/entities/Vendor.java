package com.dev.delta.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phone;

    @Column
    private String fax;

    @Column
    private String website;

    @Column(nullable = false, unique = true)
    private String accountNumber;

    @Column
    private String position;

    @Column
    private String alternativePhone;

    @Column
    private String alternativeFax;

    @Column(nullable = false)
    private String email;

    @Column(length = 2000)
    private String notes;

    @ElementCollection
    @CollectionTable(name = "vendor_invoice_prices", joinColumns = @JoinColumn(name = "vendor_id"))
    @Column(name = "invoice_price")
    @JsonIgnore
    private List<InvoicePrice> invoicePrices;

    @Column(nullable = false)
    private Boolean taxNumberRegistered;

    @Column
    private Boolean invoicePricesIncludeTax;

    @Column
    private Double taxRate;

    @Column
    private Double discount;

    @Column
    private String deliveryTime;

    @Column(length = 2000)
    private String additionalNotes;

    // Getters and setters

    // Convenience method to add an invoice price
    public void addInvoicePrice(InvoicePrice invoicePrice) {
        invoicePrices.add(invoicePrice);
    }

    // Convenience method to remove an invoice price
    public void removeInvoicePrice(InvoicePrice invoicePrice) {
        invoicePrices.remove(invoicePrice);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getAlternativePhone() {
        return alternativePhone;
    }

    public void setAlternativePhone(String alternativePhone) {
        this.alternativePhone = alternativePhone;
    }

    public String getAlternativeFax() {
        return alternativeFax;
    }

    public void setAlternativeFax(String alternativeFax) {
        this.alternativeFax = alternativeFax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<InvoicePrice> getInvoicePrices() {
        return invoicePrices;
    }

    public void setInvoicePrices(List<InvoicePrice> invoicePrices) {
        this.invoicePrices = invoicePrices;
    }

    public Boolean getTaxNumberRegistered() {
        return taxNumberRegistered;
    }

    public void setTaxNumberRegistered(Boolean taxNumberRegistered) {
        this.taxNumberRegistered = taxNumberRegistered;
    }

    public Boolean getInvoicePricesIncludeTax() {
        return invoicePricesIncludeTax;
    }

    public void setInvoicePricesIncludeTax(Boolean invoicePricesIncludeTax) {
        this.invoicePricesIncludeTax = invoicePricesIncludeTax;
    }

    public Double getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(Double taxRate) {
        this.taxRate = taxRate;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public String getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }
}



package com.dev.delta.dto;

public class PaymentRequest {

    // Fields to hold the data
    private String customerName; // The name of the customer
    private String paymentLink;   // The link for making the payment
    private double amountDue;     // The amount due for the payment
    private String description;    // Description of the service/product
    private String email;
    // Default constructor
    public PaymentRequest() {}

    // Constructor with parameters
    public PaymentRequest(String customerName, String paymentLink, double amountDue, String description) {
        this.customerName = customerName;
        this.paymentLink = paymentLink;
        this.amountDue = amountDue;
        this.description = description;
    }

    public PaymentRequest(String customerName, String paymentLink, double amountDue, String description, String email) {
        this.customerName = customerName;
        this.paymentLink = paymentLink;
        this.amountDue = amountDue;
        this.description = description;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getters and Setters
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPaymentLink() {
        return paymentLink;
    }

    public void setPaymentLink(String paymentLink) {
        this.paymentLink = paymentLink;
    }

    public double getAmountDue() {
        return amountDue;
    }

    public void setAmountDue(double amountDue) {
        this.amountDue = amountDue;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Optional: Override toString for better readability (if needed)
    @Override
    public String toString() {
        return "PaymentRequest{" +
                "customerName='" + customerName + '\'' +
                ", paymentLink='" + paymentLink + '\'' +
                ", amountDue=" + amountDue +
                ", description='" + description + '\'' +
                '}';
    }
}

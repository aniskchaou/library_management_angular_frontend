package com.dev.delta.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@Column(nullable = false)
	private BigDecimal amountPaid;  // The amount paid in this transaction

	@Column(nullable = false)
	private LocalDate paymentDate;  // The date when the payment was made

	private String paymentMethod;   // Method of payment (e.g., Cash, Credit Card, etc.)

	@Column(nullable = false)
	private BigDecimal outstandingAmount;  // The remaining fines after this payment, if any

	private String paymentReference;  // Optional field for a payment reference or transaction ID

	private String paymentStatus;     // Payment status (e.g., Completed, Pending, Failed)

	// Constructors, Getters, and Setters

	public Payment() {}

	public Payment(Member member, BigDecimal amountPaid, LocalDate paymentDate, String paymentMethod, BigDecimal outstandingAmount, String paymentReference, String paymentStatus) {
		this.member = member;
		this.amountPaid = amountPaid;
		this.paymentDate = paymentDate;
		this.paymentMethod = paymentMethod;
		this.outstandingAmount = outstandingAmount;
		this.paymentReference = paymentReference;
		this.paymentStatus = paymentStatus;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public BigDecimal getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(BigDecimal amountPaid) {
		this.amountPaid = amountPaid;
	}

	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public BigDecimal getOutstandingAmount() {
		return outstandingAmount;
	}

	public void setOutstandingAmount(BigDecimal outstandingAmount) {
		this.outstandingAmount = outstandingAmount;
	}

	public String getPaymentReference() {
		return paymentReference;
	}

	public void setPaymentReference(String paymentReference) {
		this.paymentReference = paymentReference;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
}


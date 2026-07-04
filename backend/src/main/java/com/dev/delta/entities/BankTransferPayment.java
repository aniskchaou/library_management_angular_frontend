package com.dev.delta.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Records a manual bank-transfer (or cash) payment made by a library member.
 * Staff upload proof of payment and confirm receipt manually.
 */
@Entity
@Table(name = "bank_transfer_payment")
public class BankTransferPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Member who made the payment */
    private Long memberId;
    private String memberName;

    /** Amount transferred */
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    /** Currency code, e.g. USD, EUR, VND */
    private String currency = "USD";

    /** Reference / transaction number from the bank slip */
    private String reference;

    /** Bank name or account number used */
    private String bankDetails;

    /** Purpose: FINE, SUBSCRIPTION, PURCHASE, OTHER */
    private String purpose;

    /** Optional note from the member */
    @Column(length = 500)
    private String note;

    /** PENDING / CONFIRMED / REJECTED */
    private String status = "PENDING";

    /** Staff member who confirmed/rejected */
    private String reviewedBy;

    /** Staff note on confirmation or rejection */
    @Column(length = 500)
    private String reviewNote;

    private LocalDate transferDate;
    private LocalDateTime submittedAt;
    private LocalDateTime reviewedAt;

    @PrePersist
    public void prePersist() {
        if (submittedAt == null) submittedAt = LocalDateTime.now();
    }

    // ── Getters & setters ─────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMemberId() { return memberId; }
    public void setMemberId(Long memberId) { this.memberId = memberId; }

    public String getMemberName() { return memberName; }
    public void setMemberName(String memberName) { this.memberName = memberName; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getReference() { return reference; }
    public void setReference(String reference) { this.reference = reference; }

    public String getBankDetails() { return bankDetails; }
    public void setBankDetails(String bankDetails) { this.bankDetails = bankDetails; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReviewedBy() { return reviewedBy; }
    public void setReviewedBy(String reviewedBy) { this.reviewedBy = reviewedBy; }

    public String getReviewNote() { return reviewNote; }
    public void setReviewNote(String reviewNote) { this.reviewNote = reviewNote; }

    public LocalDate getTransferDate() { return transferDate; }
    public void setTransferDate(LocalDate transferDate) { this.transferDate = transferDate; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
}

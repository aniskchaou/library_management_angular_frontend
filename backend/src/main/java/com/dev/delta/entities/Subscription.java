package com.dev.delta.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
public class Subscription {

    public enum SubStatus { ACTIVE, TRIALING, PAST_DUE, CANCELED, UNPAID }
    public enum BillingCycle { MONTHLY, YEARLY }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long organizationId;

    @Column(nullable = false)
    private Long planId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SubStatus status = SubStatus.TRIALING;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private BillingCycle billingCycle = BillingCycle.MONTHLY;

    @Column
    private LocalDate currentPeriodStart;

    @Column
    private LocalDate currentPeriodEnd;

    @Column
    private LocalDate trialEnd;

    // Stripe identifiers
    @Column(length = 255)
    private String stripeSubscriptionId;

    @Column(length = 255)
    private String stripePaymentMethodId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount = BigDecimal.ZERO;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime canceledAt;

    @Column(length = 500)
    private String cancelReason;

    // Constructors
    public Subscription() {}

    public Subscription(Long organizationId, Long planId, BillingCycle billingCycle) {
        this.organizationId = organizationId;
        this.planId = planId;
        this.billingCycle = billingCycle;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrganizationId() { return organizationId; }
    public void setOrganizationId(Long organizationId) { this.organizationId = organizationId; }

    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }

    public SubStatus getStatus() { return status; }
    public void setStatus(SubStatus status) { this.status = status; }

    public BillingCycle getBillingCycle() { return billingCycle; }
    public void setBillingCycle(BillingCycle billingCycle) { this.billingCycle = billingCycle; }

    public LocalDate getCurrentPeriodStart() { return currentPeriodStart; }
    public void setCurrentPeriodStart(LocalDate currentPeriodStart) { this.currentPeriodStart = currentPeriodStart; }

    public LocalDate getCurrentPeriodEnd() { return currentPeriodEnd; }
    public void setCurrentPeriodEnd(LocalDate currentPeriodEnd) { this.currentPeriodEnd = currentPeriodEnd; }

    public LocalDate getTrialEnd() { return trialEnd; }
    public void setTrialEnd(LocalDate trialEnd) { this.trialEnd = trialEnd; }

    public String getStripeSubscriptionId() { return stripeSubscriptionId; }
    public void setStripeSubscriptionId(String stripeSubscriptionId) { this.stripeSubscriptionId = stripeSubscriptionId; }

    public String getStripePaymentMethodId() { return stripePaymentMethodId; }
    public void setStripePaymentMethodId(String stripePaymentMethodId) { this.stripePaymentMethodId = stripePaymentMethodId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getCanceledAt() { return canceledAt; }
    public void setCanceledAt(LocalDateTime canceledAt) { this.canceledAt = canceledAt; }

    public String getCancelReason() { return cancelReason; }
    public void setCancelReason(String cancelReason) { this.cancelReason = cancelReason; }
}

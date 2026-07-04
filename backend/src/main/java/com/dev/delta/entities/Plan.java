package com.dev.delta.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "plans")
public class Plan {

    public enum BillingCycle { MONTHLY, YEARLY }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal priceMonthly = BigDecimal.ZERO;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal priceYearly = BigDecimal.ZERO;

    @Column(nullable = false)
    private int maxUsers = 5;

    @Column(nullable = false)
    private int maxBooks = 500;

    @Column(nullable = false)
    private int maxStorageGb = 1;

    @Column(nullable = false)
    private boolean canUseAnalytics = false;

    @Column(nullable = false)
    private boolean canUseApi = false;

    @Column(nullable = false)
    private boolean canUseSso = false;

    @Column(nullable = false)
    private boolean canUseCustomBranding = false;

    @Column(nullable = false)
    private boolean isActive = true;

    // Stripe price IDs for recurring billing
    @Column(length = 255)
    private String stripePriceIdMonthly;

    @Column(length = 255)
    private String stripePriceIdYearly;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public Plan() {}

    public Plan(String name, BigDecimal priceMonthly, BigDecimal priceYearly) {
        this.name = name;
        this.priceMonthly = priceMonthly;
        this.priceYearly = priceYearly;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPriceMonthly() { return priceMonthly; }
    public void setPriceMonthly(BigDecimal priceMonthly) { this.priceMonthly = priceMonthly; }

    public BigDecimal getPriceYearly() { return priceYearly; }
    public void setPriceYearly(BigDecimal priceYearly) { this.priceYearly = priceYearly; }

    public int getMaxUsers() { return maxUsers; }
    public void setMaxUsers(int maxUsers) { this.maxUsers = maxUsers; }

    public int getMaxBooks() { return maxBooks; }
    public void setMaxBooks(int maxBooks) { this.maxBooks = maxBooks; }

    public int getMaxStorageGb() { return maxStorageGb; }
    public void setMaxStorageGb(int maxStorageGb) { this.maxStorageGb = maxStorageGb; }

    public boolean isCanUseAnalytics() { return canUseAnalytics; }
    public void setCanUseAnalytics(boolean canUseAnalytics) { this.canUseAnalytics = canUseAnalytics; }

    public boolean isCanUseApi() { return canUseApi; }
    public void setCanUseApi(boolean canUseApi) { this.canUseApi = canUseApi; }

    public boolean isCanUseSso() { return canUseSso; }
    public void setCanUseSso(boolean canUseSso) { this.canUseSso = canUseSso; }

    public boolean isCanUseCustomBranding() { return canUseCustomBranding; }
    public void setCanUseCustomBranding(boolean canUseCustomBranding) { this.canUseCustomBranding = canUseCustomBranding; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    public String getStripePriceIdMonthly() { return stripePriceIdMonthly; }
    public void setStripePriceIdMonthly(String stripePriceIdMonthly) { this.stripePriceIdMonthly = stripePriceIdMonthly; }

    public String getStripePriceIdYearly() { return stripePriceIdYearly; }
    public void setStripePriceIdYearly(String stripePriceIdYearly) { this.stripePriceIdYearly = stripePriceIdYearly; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

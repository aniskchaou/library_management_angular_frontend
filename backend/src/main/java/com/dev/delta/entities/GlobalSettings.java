package com.dev.delta.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "global_settings")
public class GlobalSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Email provider
    @Column(length = 50)
    private String emailProvider;  // SMTP, SENDGRID, SES
    @Column(length = 255)
    private String emailApiKey;
    @Column(length = 255)
    private String emailFromAddress;
    @Column(length = 255)
    private String emailFromName;

    // SMS provider
    @Column(length = 50)
    private String smsProvider;  // TWILIO, NEXMO, AWS_SNS
    @Column(length = 255)
    private String smsApiKey;
    @Column(length = 255)
    private String smsApiSecret;
    @Column(length = 50)
    private String smsFromNumber;

    // Storage provider
    @Column(length = 50)
    private String storageProvider;  // LOCAL, S3, GCS, AZURE_BLOB
    @Column(length = 255)
    private String storageApiKey;
    @Column(length = 255)
    private String storageApiSecret;
    @Column(length = 255)
    private String storageBucketName;
    @Column(length = 255)
    private String storageRegion;
    @Column(nullable = false)
    private int defaultStorageGbPerOrg = 5;

    // Payment gateway
    @Column(length = 50)
    private String paymentGateway;  // STRIPE, PAYPAL
    @Column(length = 255)
    private String stripePublishableKey;
    @Column(length = 255)
    private String stripeSecretKey;
    @Column(length = 255)
    private String stripeWebhookSecret;

    // OAuth providers
    @Column(nullable = false)
    private boolean googleOAuthEnabled = false;
    @Column(length = 255)
    private String googleClientId;
    @Column(length = 255)
    private String googleClientSecret;
    @Column(nullable = false)
    private boolean githubOAuthEnabled = false;
    @Column(length = 255)
    private String githubClientId;
    @Column(length = 255)
    private String githubClientSecret;

    // SSO (SAML/OIDC)
    @Column(nullable = false)
    private boolean ssoEnabled = false;
    @Column(length = 1000)
    private String ssoMetadataUrl;
    @Column(length = 255)
    private String ssoEntityId;

    // Branding
    @Column(length = 255)
    private String defaultLogoUrl;
    @Column(length = 50)
    private String defaultPrimaryColor;
    @Column(length = 255)
    private String platformName;

    // Localization
    @Column(length = 10)
    private String defaultLanguage = "en";
    @Column(length = 50)
    private String defaultTimezone = "UTC";

    // Trial settings
    @Column(nullable = false)
    private int trialDurationDays = 14;

    @Column
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void onUpdate() { this.updatedAt = LocalDateTime.now(); }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmailProvider() { return emailProvider; }
    public void setEmailProvider(String emailProvider) { this.emailProvider = emailProvider; }
    public String getEmailApiKey() { return emailApiKey; }
    public void setEmailApiKey(String emailApiKey) { this.emailApiKey = emailApiKey; }
    public String getEmailFromAddress() { return emailFromAddress; }
    public void setEmailFromAddress(String emailFromAddress) { this.emailFromAddress = emailFromAddress; }
    public String getEmailFromName() { return emailFromName; }
    public void setEmailFromName(String emailFromName) { this.emailFromName = emailFromName; }
    public String getSmsProvider() { return smsProvider; }
    public void setSmsProvider(String smsProvider) { this.smsProvider = smsProvider; }
    public String getSmsApiKey() { return smsApiKey; }
    public void setSmsApiKey(String smsApiKey) { this.smsApiKey = smsApiKey; }
    public String getSmsApiSecret() { return smsApiSecret; }
    public void setSmsApiSecret(String smsApiSecret) { this.smsApiSecret = smsApiSecret; }
    public String getSmsFromNumber() { return smsFromNumber; }
    public void setSmsFromNumber(String smsFromNumber) { this.smsFromNumber = smsFromNumber; }
    public String getStorageProvider() { return storageProvider; }
    public void setStorageProvider(String storageProvider) { this.storageProvider = storageProvider; }
    public String getStorageApiKey() { return storageApiKey; }
    public void setStorageApiKey(String storageApiKey) { this.storageApiKey = storageApiKey; }
    public String getStorageApiSecret() { return storageApiSecret; }
    public void setStorageApiSecret(String storageApiSecret) { this.storageApiSecret = storageApiSecret; }
    public String getStorageBucketName() { return storageBucketName; }
    public void setStorageBucketName(String storageBucketName) { this.storageBucketName = storageBucketName; }
    public String getStorageRegion() { return storageRegion; }
    public void setStorageRegion(String storageRegion) { this.storageRegion = storageRegion; }
    public int getDefaultStorageGbPerOrg() { return defaultStorageGbPerOrg; }
    public void setDefaultStorageGbPerOrg(int defaultStorageGbPerOrg) { this.defaultStorageGbPerOrg = defaultStorageGbPerOrg; }
    public String getPaymentGateway() { return paymentGateway; }
    public void setPaymentGateway(String paymentGateway) { this.paymentGateway = paymentGateway; }
    public String getStripePublishableKey() { return stripePublishableKey; }
    public void setStripePublishableKey(String stripePublishableKey) { this.stripePublishableKey = stripePublishableKey; }
    public String getStripeSecretKey() { return stripeSecretKey; }
    public void setStripeSecretKey(String stripeSecretKey) { this.stripeSecretKey = stripeSecretKey; }
    public String getStripeWebhookSecret() { return stripeWebhookSecret; }
    public void setStripeWebhookSecret(String stripeWebhookSecret) { this.stripeWebhookSecret = stripeWebhookSecret; }
    public boolean isGoogleOAuthEnabled() { return googleOAuthEnabled; }
    public void setGoogleOAuthEnabled(boolean googleOAuthEnabled) { this.googleOAuthEnabled = googleOAuthEnabled; }
    public String getGoogleClientId() { return googleClientId; }
    public void setGoogleClientId(String googleClientId) { this.googleClientId = googleClientId; }
    public String getGoogleClientSecret() { return googleClientSecret; }
    public void setGoogleClientSecret(String googleClientSecret) { this.googleClientSecret = googleClientSecret; }
    public boolean isGithubOAuthEnabled() { return githubOAuthEnabled; }
    public void setGithubOAuthEnabled(boolean githubOAuthEnabled) { this.githubOAuthEnabled = githubOAuthEnabled; }
    public String getGithubClientId() { return githubClientId; }
    public void setGithubClientId(String githubClientId) { this.githubClientId = githubClientId; }
    public String getGithubClientSecret() { return githubClientSecret; }
    public void setGithubClientSecret(String githubClientSecret) { this.githubClientSecret = githubClientSecret; }
    public boolean isSsoEnabled() { return ssoEnabled; }
    public void setSsoEnabled(boolean ssoEnabled) { this.ssoEnabled = ssoEnabled; }
    public String getSsoMetadataUrl() { return ssoMetadataUrl; }
    public void setSsoMetadataUrl(String ssoMetadataUrl) { this.ssoMetadataUrl = ssoMetadataUrl; }
    public String getSsoEntityId() { return ssoEntityId; }
    public void setSsoEntityId(String ssoEntityId) { this.ssoEntityId = ssoEntityId; }
    public String getDefaultLogoUrl() { return defaultLogoUrl; }
    public void setDefaultLogoUrl(String defaultLogoUrl) { this.defaultLogoUrl = defaultLogoUrl; }
    public String getDefaultPrimaryColor() { return defaultPrimaryColor; }
    public void setDefaultPrimaryColor(String defaultPrimaryColor) { this.defaultPrimaryColor = defaultPrimaryColor; }
    public String getPlatformName() { return platformName; }
    public void setPlatformName(String platformName) { this.platformName = platformName; }
    public String getDefaultLanguage() { return defaultLanguage; }
    public void setDefaultLanguage(String defaultLanguage) { this.defaultLanguage = defaultLanguage; }
    public String getDefaultTimezone() { return defaultTimezone; }
    public void setDefaultTimezone(String defaultTimezone) { this.defaultTimezone = defaultTimezone; }
    public int getTrialDurationDays() { return trialDurationDays; }
    public void setTrialDurationDays(int trialDurationDays) { this.trialDurationDays = trialDurationDays; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

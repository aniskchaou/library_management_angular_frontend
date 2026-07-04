package com.dev.delta.controllers;

import com.dev.delta.entities.GlobalSettings;
import com.dev.delta.repositories.GlobalSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/super-admin/global-settings")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class GlobalSettingsController {

    @Autowired
    private GlobalSettingsRepository settingsRepo;

    @GetMapping
    public ResponseEntity<GlobalSettings> get() {
        GlobalSettings settings = settingsRepo.findFirstByOrderByIdAsc()
                .orElseGet(() -> settingsRepo.save(new GlobalSettings()));
        // Mask secrets before returning
        settings.setStripeSecretKey(mask(settings.getStripeSecretKey()));
        settings.setStripeWebhookSecret(mask(settings.getStripeWebhookSecret()));
        settings.setEmailApiKey(mask(settings.getEmailApiKey()));
        settings.setSmsApiKey(mask(settings.getSmsApiKey()));
        settings.setSmsApiSecret(mask(settings.getSmsApiSecret()));
        settings.setStorageApiKey(mask(settings.getStorageApiKey()));
        settings.setStorageApiSecret(mask(settings.getStorageApiSecret()));
        settings.setGoogleClientSecret(mask(settings.getGoogleClientSecret()));
        settings.setGithubClientSecret(mask(settings.getGithubClientSecret()));
        return ResponseEntity.ok(settings);
    }

    @PutMapping
    public ResponseEntity<Map<String, String>> update(@RequestBody GlobalSettings updates) {
        GlobalSettings settings = settingsRepo.findFirstByOrderByIdAsc()
                .orElse(new GlobalSettings());

        // Only overwrite non-masked fields
        applyNonMasked(settings, updates);
        settingsRepo.save(settings);
        return ResponseEntity.ok(Map.of("message", "Settings saved"));
    }

    private void applyNonMasked(GlobalSettings target, GlobalSettings src) {
        if (src.getEmailProvider() != null) target.setEmailProvider(src.getEmailProvider());
        if (isReal(src.getEmailApiKey())) target.setEmailApiKey(src.getEmailApiKey());
        if (src.getEmailFromAddress() != null) target.setEmailFromAddress(src.getEmailFromAddress());
        if (src.getEmailFromName() != null) target.setEmailFromName(src.getEmailFromName());

        if (src.getSmsProvider() != null) target.setSmsProvider(src.getSmsProvider());
        if (isReal(src.getSmsApiKey())) target.setSmsApiKey(src.getSmsApiKey());
        if (isReal(src.getSmsApiSecret())) target.setSmsApiSecret(src.getSmsApiSecret());
        if (src.getSmsFromNumber() != null) target.setSmsFromNumber(src.getSmsFromNumber());

        if (src.getStorageProvider() != null) target.setStorageProvider(src.getStorageProvider());
        if (isReal(src.getStorageApiKey())) target.setStorageApiKey(src.getStorageApiKey());
        if (isReal(src.getStorageApiSecret())) target.setStorageApiSecret(src.getStorageApiSecret());
        if (src.getStorageBucketName() != null) target.setStorageBucketName(src.getStorageBucketName());
        if (src.getStorageRegion() != null) target.setStorageRegion(src.getStorageRegion());
        target.setDefaultStorageGbPerOrg(src.getDefaultStorageGbPerOrg() > 0 ? src.getDefaultStorageGbPerOrg() : target.getDefaultStorageGbPerOrg());

        if (src.getPaymentGateway() != null) target.setPaymentGateway(src.getPaymentGateway());
        if (src.getStripePublishableKey() != null) target.setStripePublishableKey(src.getStripePublishableKey());
        if (isReal(src.getStripeSecretKey())) target.setStripeSecretKey(src.getStripeSecretKey());
        if (isReal(src.getStripeWebhookSecret())) target.setStripeWebhookSecret(src.getStripeWebhookSecret());

        target.setGoogleOAuthEnabled(src.isGoogleOAuthEnabled());
        if (src.getGoogleClientId() != null) target.setGoogleClientId(src.getGoogleClientId());
        if (isReal(src.getGoogleClientSecret())) target.setGoogleClientSecret(src.getGoogleClientSecret());
        target.setGithubOAuthEnabled(src.isGithubOAuthEnabled());
        if (src.getGithubClientId() != null) target.setGithubClientId(src.getGithubClientId());
        if (isReal(src.getGithubClientSecret())) target.setGithubClientSecret(src.getGithubClientSecret());

        target.setSsoEnabled(src.isSsoEnabled());
        if (src.getSsoMetadataUrl() != null) target.setSsoMetadataUrl(src.getSsoMetadataUrl());
        if (src.getSsoEntityId() != null) target.setSsoEntityId(src.getSsoEntityId());

        if (src.getDefaultLogoUrl() != null) target.setDefaultLogoUrl(src.getDefaultLogoUrl());
        if (src.getDefaultPrimaryColor() != null) target.setDefaultPrimaryColor(src.getDefaultPrimaryColor());
        if (src.getPlatformName() != null) target.setPlatformName(src.getPlatformName());
        if (src.getDefaultLanguage() != null) target.setDefaultLanguage(src.getDefaultLanguage());
        if (src.getDefaultTimezone() != null) target.setDefaultTimezone(src.getDefaultTimezone());
        if (src.getTrialDurationDays() > 0) target.setTrialDurationDays(src.getTrialDurationDays());
    }

    private String mask(String value) {
        if (value == null || value.isEmpty()) return null;
        return "••••••••" + (value.length() > 4 ? value.substring(value.length() - 4) : "");
    }

    private boolean isReal(String value) {
        return value != null && !value.startsWith("••••");
    }
}

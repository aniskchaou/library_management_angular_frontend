package com.dev.delta.controllers;

import com.dev.delta.entities.Subscription;
import com.dev.delta.repositories.SubscriptionRepository;
import com.dev.delta.services.StripeSubscriptionService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    @Autowired
    private StripeSubscriptionService stripeService;

    @Autowired
    private SubscriptionRepository subscriptionRepo;

    /** Create Stripe checkout session — accessible by org admins */
    @PostMapping("/checkout")
    public ResponseEntity<?> createCheckout(@RequestBody Map<String, Object> body) {
        try {
            Long orgId = Long.valueOf(body.get("orgId").toString());
            Long planId = Long.valueOf(body.get("planId").toString());
            Subscription.BillingCycle cycle = Subscription.BillingCycle.valueOf(
                    body.getOrDefault("cycle", "MONTHLY").toString());
            String successUrl = body.getOrDefault("successUrl", "http://localhost:4200/billing/success").toString();
            String cancelUrl = body.getOrDefault("cancelUrl", "http://localhost:4200/billing").toString();

            String checkoutUrl = stripeService.createCheckoutSession(orgId, planId, cycle, successUrl, cancelUrl);
            return ResponseEntity.ok(Map.of("url", checkoutUrl));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** Cancel subscription */
    @PostMapping("/cancel")
    public ResponseEntity<?> cancel(@RequestBody Map<String, Object> body, Authentication auth) {
        try {
            Long orgId = Long.valueOf(body.get("orgId").toString());
            String reason = body.getOrDefault("reason", "Cancelled by admin").toString();
            stripeService.cancelSubscription(orgId, reason);
            return ResponseEntity.ok(Map.of("message", "Subscription cancelled"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** Get subscription for an org */
    @GetMapping("/organization/{orgId}")
    public ResponseEntity<?> getByOrg(@PathVariable Long orgId) {
        return subscriptionRepo.findByOrganizationIdAndStatusNot(orgId, Subscription.SubStatus.CANCELED)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** Super-admin: SaaS-wide metrics */
    @GetMapping("/metrics")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> metrics() {
        return ResponseEntity.ok(stripeService.getSaasMetrics());
    }

    /** Stripe webhook endpoint */
    @PostMapping("/webhook")
    public ResponseEntity<String> stripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, stripeService.getWebhookSecret());
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        }

        switch (event.getType()) {
            case "customer.subscription.created":
            case "customer.subscription.updated":
                handleSubscriptionEvent(event);
                break;
            case "customer.subscription.deleted":
                handleSubscriptionDeleted(event);
                break;
            default:
                break;
        }
        return ResponseEntity.ok("Received");
    }

    private void handleSubscriptionEvent(Event event) {
        event.getDataObjectDeserializer().getObject().ifPresent(obj -> {
            com.stripe.model.Subscription stripeSub = (com.stripe.model.Subscription) obj;
            Map<String, String> meta = stripeSub.getMetadata();
            stripeService.handleSubscriptionActivated(
                    stripeSub.getId(),
                    meta.getOrDefault("orgId", "0"),
                    meta.getOrDefault("planId", "0"),
                    meta.getOrDefault("cycle", "MONTHLY"),
                    stripeSub.getCurrentPeriodStart(),
                    stripeSub.getCurrentPeriodEnd()
            );
        });
    }

    private void handleSubscriptionDeleted(Event event) {
        event.getDataObjectDeserializer().getObject().ifPresent(obj -> {
            com.stripe.model.Subscription stripeSub = (com.stripe.model.Subscription) obj;
            subscriptionRepo.findByStripeSubscriptionId(stripeSub.getId()).ifPresent(sub -> {
                sub.setStatus(Subscription.SubStatus.CANCELED);
                subscriptionRepo.save(sub);
            });
        });
    }
}

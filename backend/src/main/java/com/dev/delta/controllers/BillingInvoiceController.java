package com.dev.delta.controllers;

import com.dev.delta.entities.SaasBillingInvoice;
import com.dev.delta.repositories.SaasBillingInvoiceRepository;
import com.stripe.model.Event;
import com.stripe.model.Invoice;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Map;

@RestController
@RequestMapping("/api/super-admin/invoices")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class BillingInvoiceController {

    @Autowired
    private SaasBillingInvoiceRepository invoiceRepo;

    @Value("${app.stripe.webhook-secret:}")
    private String webhookSecret;

    @GetMapping
    public Page<SaasBillingInvoice> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return invoiceRepo.findAllByOrderByCreatedAtDesc(
                PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    @GetMapping("/organization/{orgId}")
    public Page<SaasBillingInvoice> getByOrg(
            @PathVariable Long orgId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return invoiceRepo.findByOrganizationId(orgId,
                PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaasBillingInvoice> getById(@PathVariable Long id) {
        return invoiceRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Stripe webhook for invoice events (public, verified by signature)
    @PostMapping("/webhook/stripe")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> stripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
            if (event.getType().startsWith("invoice.")) {
                Invoice stripeInvoice = (Invoice) event.getDataObjectDeserializer()
                        .getObject().orElse(null);
                if (stripeInvoice != null) {
                    saveOrUpdateInvoice(stripeInvoice, event.getType());
                }
            }
            return ResponseEntity.ok(Map.of("received", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private void saveOrUpdateInvoice(Invoice stripe, String eventType) {
        SaasBillingInvoice inv = invoiceRepo.findByStripeInvoiceId(stripe.getId())
                .orElse(new SaasBillingInvoice());
        inv.setStripeInvoiceId(stripe.getId());
        inv.setAmount(BigDecimal.valueOf(stripe.getAmountDue()).divide(BigDecimal.valueOf(100)));
        inv.setAmountPaid(BigDecimal.valueOf(stripe.getAmountPaid()).divide(BigDecimal.valueOf(100)));
        inv.setCurrency(stripe.getCurrency());
        inv.setStripeHostedUrl(stripe.getHostedInvoiceUrl());
        inv.setStripePdfUrl(stripe.getInvoicePdf());

        if (stripe.getPeriodStart() != null)
            inv.setPeriodStart(LocalDateTime.ofInstant(Instant.ofEpochSecond(stripe.getPeriodStart()), ZoneOffset.UTC).toLocalDate());
        if (stripe.getPeriodEnd() != null)
            inv.setPeriodEnd(LocalDateTime.ofInstant(Instant.ofEpochSecond(stripe.getPeriodEnd()), ZoneOffset.UTC).toLocalDate());

        switch (eventType) {
            case "invoice.paid": inv.setStatus(SaasBillingInvoice.InvoiceStatus.PAID); break;
            case "invoice.payment_failed": inv.setStatus(SaasBillingInvoice.InvoiceStatus.OPEN); break;
            case "invoice.voided": inv.setStatus(SaasBillingInvoice.InvoiceStatus.VOID); break;
            default: inv.setStatus(SaasBillingInvoice.InvoiceStatus.DRAFT);
        }

        invoiceRepo.save(inv);
    }
}

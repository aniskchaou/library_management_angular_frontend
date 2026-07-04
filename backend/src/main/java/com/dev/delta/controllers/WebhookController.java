package com.dev.delta.controllers;

import com.dev.delta.entities.WebhookSubscription;
import com.dev.delta.repositories.WebhookSubscriptionRepository;
import com.dev.delta.services.WebhookDeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Manage webhook subscriptions and trigger test deliveries.
 * Endpoints: /webhook/**
 */
@RestController
@RequestMapping("webhook")
@CrossOrigin(origins = "*")
public class WebhookController {

    @Autowired
    private WebhookSubscriptionRepository subscriptionRepository;

    @Autowired
    private WebhookDeliveryService deliveryService;

    @GetMapping("/all")
    public List<WebhookSubscription> getAll() {
        return subscriptionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WebhookSubscription> getById(@PathVariable Long id) {
        return subscriptionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public WebhookSubscription create(@RequestBody WebhookSubscription sub) {
        return subscriptionRepository.save(sub);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WebhookSubscription> update(@PathVariable Long id,
                                                       @RequestBody WebhookSubscription updated) {
        return subscriptionRepository.findById(id).map(s -> {
            s.setUrl(updated.getUrl());
            s.setEvents(updated.getEvents());
            s.setSecret(updated.getSecret());
            s.setActive(updated.isActive());
            s.setDescription(updated.getDescription());
            return ResponseEntity.ok(subscriptionRepository.save(s));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        subscriptionRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }

    /**
     * Send a test ping to the given subscription so the subscriber can
     * verify their endpoint is wired up correctly.
     */
    @PostMapping("/{id}/test")
    public ResponseEntity<?> test(@PathVariable Long id) {
        return subscriptionRepository.findById(id).map(s -> {
            deliveryService.fire("webhook.test", Map.of(
                    "message", "This is a test ping from Library Lab",
                    "subscriptionId", id
            ));
            return ResponseEntity.ok(Map.of("sent", true));
        }).orElse(ResponseEntity.notFound().build());
    }

    /** List supported event types */
    @GetMapping("/events")
    public ResponseEntity<?> supportedEvents() {
        return ResponseEntity.ok(List.of(
                "book.created", "book.updated", "book.deleted",
                "member.created", "member.updated", "member.expired",
                "circulation.issued", "circulation.returned", "circulation.overdue",
                "payment.completed", "payment.waived",
                "reservation.placed", "reservation.cancelled", "reservation.expired",
                "backup.completed", "report.exported",
                "*"  // wildcard: receive all events
        ));
    }
}

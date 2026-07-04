package com.dev.delta.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * A webhook subscription: when a library event fires, the system will
 * HTTP-POST a JSON payload to the subscriber's URL.
 */
@Entity
@Table(name = "webhook_subscription")
public class WebhookSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Target URL to call */
    @Column(nullable = false, length = 500)
    private String url;

    /**
     * Comma-separated list of events to subscribe to.
     * e.g. "book.created,circulation.issued,member.created,payment.completed"
     */
    @Column(length = 1000)
    private String events;

    /** HMAC secret used to sign the payload (SHA-256) */
    @Column(length = 255)
    private String secret;

    private boolean active = true;

    /** Optional description / label */
    @Column(length = 255)
    private String description;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // ── Getters / Setters ─────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getEvents() { return events; }
    public void setEvents(String events) { this.events = events; }

    public String getSecret() { return secret; }
    public void setSecret(String secret) { this.secret = secret; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

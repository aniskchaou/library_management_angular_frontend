package com.dev.delta.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    public enum AuditAction {
        CREATE, UPDATE, DELETE, LOGIN, LOGOUT, SUSPEND, ACTIVATE,
        LOCK_USER, UNLOCK_USER, RESET_PASSWORD, ASSIGN_PLAN,
        IMPERSONATE, TRANSFER_OWNERSHIP, STRIPE_EVENT
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private AuditAction action;

    @Column(nullable = false, length = 100)
    private String entityType;   // e.g. "Organization", "User", "Subscription"

    @Column
    private Long entityId;

    @Column(length = 255)
    private String actorUsername;  // who performed the action

    @Column
    private Long actorUserId;

    @Column
    private Long organizationId;  // null = super-admin action

    @Column(length = 2000)
    private String description;

    @Column(length = 45)
    private String ipAddress;

    @Column(length = 500)
    private String userAgent;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public AuditLog() {}

    public AuditLog(AuditAction action, String entityType, Long entityId,
                    String actorUsername, Long actorUserId, Long organizationId,
                    String description) {
        this.action = action;
        this.entityType = entityType;
        this.entityId = entityId;
        this.actorUsername = actorUsername;
        this.actorUserId = actorUserId;
        this.organizationId = organizationId;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public AuditAction getAction() { return action; }
    public void setAction(AuditAction action) { this.action = action; }

    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }

    public Long getEntityId() { return entityId; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }

    public String getActorUsername() { return actorUsername; }
    public void setActorUsername(String actorUsername) { this.actorUsername = actorUsername; }

    public Long getActorUserId() { return actorUserId; }
    public void setActorUserId(Long actorUserId) { this.actorUserId = actorUserId; }

    public Long getOrganizationId() { return organizationId; }
    public void setOrganizationId(Long organizationId) { this.organizationId = organizationId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

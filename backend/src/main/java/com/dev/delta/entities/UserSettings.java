package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private boolean allowUserRegistration; // Indicates whether user registration is allowed

    @Column(nullable = false)
    private boolean requireEmailVerification; // Indicates whether email verification is required for new users

    @Column(nullable = false)
    private String defaultUserRole; // Default role assigned to new users

    // Constructors
    public UserSettings() {
    }

    public UserSettings(boolean allowUserRegistration, boolean requireEmailVerification, String defaultUserRole) {
        this.allowUserRegistration = allowUserRegistration;
        this.requireEmailVerification = requireEmailVerification;
        this.defaultUserRole = defaultUserRole;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isAllowUserRegistration() {
        return allowUserRegistration;
    }

    public void setAllowUserRegistration(boolean allowUserRegistration) {
        this.allowUserRegistration = allowUserRegistration;
    }

    public boolean isRequireEmailVerification() {
        return requireEmailVerification;
    }

    public void setRequireEmailVerification(boolean requireEmailVerification) {
        this.requireEmailVerification = requireEmailVerification;
    }

    public String getDefaultUserRole() {
        return defaultUserRole;
    }

    public void setDefaultUserRole(String defaultUserRole) {
        this.defaultUserRole = defaultUserRole;
    }

    @Override
    public String toString() {
        return "UserSettings{" +
                "id=" + id +
                ", allowUserRegistration=" + allowUserRegistration +
                ", requireEmailVerification=" + requireEmailVerification +
                ", defaultUserRole='" + defaultUserRole + '\'' +
                '}';
    }
}


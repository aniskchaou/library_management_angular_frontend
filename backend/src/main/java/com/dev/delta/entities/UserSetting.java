package com.dev.delta.entities;


import javax.persistence.*;

@Entity
@Table(name = "user_setting")
//@Access(AccessType.PROPERTY)  // Enforce property access

public class UserSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_registration")
    private boolean allowUserRegistration;

    @Column(name = "email_verification")
    private boolean requireEmailVerification;

    @Column(name = "user_role")
    private String defaultUserRole;

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
}

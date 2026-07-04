package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class NotificationSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private boolean receiveAlertsForItemAvailability; // Indicates whether alerts for item availability are enabled

    @Column(nullable = false)
    private boolean receiveAlertsForDueDates; // Indicates whether alerts for due dates are enabled

    @Column(nullable = false)
    private boolean receiveAlertsForNewArrivals; // Indicates whether alerts for new arrivals are enabled

    // Constructors
    public NotificationSettings() {
    }

    public NotificationSettings(boolean receiveAlertsForItemAvailability, boolean receiveAlertsForDueDates, boolean receiveAlertsForNewArrivals) {
        this.receiveAlertsForItemAvailability = receiveAlertsForItemAvailability;
        this.receiveAlertsForDueDates = receiveAlertsForDueDates;
        this.receiveAlertsForNewArrivals = receiveAlertsForNewArrivals;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isReceiveAlertsForItemAvailability() {
        return receiveAlertsForItemAvailability;
    }

    public void setReceiveAlertsForItemAvailability(boolean receiveAlertsForItemAvailability) {
        this.receiveAlertsForItemAvailability = receiveAlertsForItemAvailability;
    }

    public boolean isReceiveAlertsForDueDates() {
        return receiveAlertsForDueDates;
    }

    public void setReceiveAlertsForDueDates(boolean receiveAlertsForDueDates) {
        this.receiveAlertsForDueDates = receiveAlertsForDueDates;
    }

    public boolean isReceiveAlertsForNewArrivals() {
        return receiveAlertsForNewArrivals;
    }

    public void setReceiveAlertsForNewArrivals(boolean receiveAlertsForNewArrivals) {
        this.receiveAlertsForNewArrivals = receiveAlertsForNewArrivals;
    }

    @Override
    public String toString() {
        return "NotificationSettings{" +
                "id=" + id +
                ", receiveAlertsForItemAvailability=" + receiveAlertsForItemAvailability +
                ", receiveAlertsForDueDates=" + receiveAlertsForDueDates +
                ", receiveAlertsForNewArrivals=" + receiveAlertsForNewArrivals +
                '}';
    }
}

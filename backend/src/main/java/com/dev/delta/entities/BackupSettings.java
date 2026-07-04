package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class BackupSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BackupFrequency backupFrequency; // Frequency of backups

    @Column(nullable = false)
    private boolean enableAutomaticBackups; // Indicates whether automatic backups are enabled

    @Column(nullable = false)
    private String backupLocation; // Location where backups are stored

    // Constructors
    public BackupSettings() {
    }

    public BackupSettings(BackupFrequency backupFrequency, boolean enableAutomaticBackups, String backupLocation) {
        this.backupFrequency = backupFrequency;
        this.enableAutomaticBackups = enableAutomaticBackups;
        this.backupLocation = backupLocation;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BackupFrequency getBackupFrequency() {
        return backupFrequency;
    }

    public void setBackupFrequency(BackupFrequency backupFrequency) {
        this.backupFrequency = backupFrequency;
    }

    public boolean isEnableAutomaticBackups() {
        return enableAutomaticBackups;
    }

    public void setEnableAutomaticBackups(boolean enableAutomaticBackups) {
        this.enableAutomaticBackups = enableAutomaticBackups;
    }

    public String getBackupLocation() {
        return backupLocation;
    }

    public void setBackupLocation(String backupLocation) {
        this.backupLocation = backupLocation;
    }

    @Override
    public String toString() {
        return "BackupSettings{" +
                "id=" + id +
                ", backupFrequency=" + backupFrequency +
                ", enableAutomaticBackups=" + enableAutomaticBackups +
                ", backupLocation='" + backupLocation + '\'' +
                '}';
    }
}


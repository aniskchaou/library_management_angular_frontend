package com.dev.delta.entities;

import javax.persistence.*;

@Entity
public class DisplaySettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private boolean lightTheme; // Indicates if light theme is enabled

    @Column(nullable = false)
    private boolean darkTheme; // Indicates if dark theme is enabled

    @Column
    private String primaryColor; // The primary color used in the UI

    // Constructors
    public DisplaySettings() {
    }

    public DisplaySettings(boolean lightTheme, boolean darkTheme, String primaryColor) {
        this.lightTheme = lightTheme;
        this.darkTheme = darkTheme;
        this.primaryColor = primaryColor;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isLightTheme() {
        return lightTheme;
    }

    public void setLightTheme(boolean lightTheme) {
        this.lightTheme = lightTheme;
    }

    public boolean isDarkTheme() {
        return darkTheme;
    }

    public void setDarkTheme(boolean darkTheme) {
        this.darkTheme = darkTheme;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    @Override
    public String toString() {
        return "DisplaySettings{" +
                "id=" + id +
                ", lightTheme=" + lightTheme +
                ", darkTheme=" + darkTheme +
                ", primaryColor='" + primaryColor + '\'' +
                '}';
    }
}


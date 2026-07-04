package com.dev.delta.analytics.models;

public class ChartData {
    private String name;
    private long value;

    public ChartData(String name, long value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
// Getters and Setters
}

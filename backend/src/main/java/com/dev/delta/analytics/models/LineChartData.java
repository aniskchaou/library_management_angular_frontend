package com.dev.delta.analytics.models;

import java.util.List;

public class LineChartData {
    private String name;
    private List<SeriesData> series;

    public LineChartData(String name, List<SeriesData> series) {
        this.name = name;
        this.series = series;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SeriesData> getSeries() {
        return series;
    }

    public void setSeries(List<SeriesData> series) {
        this.series = series;
    }
// Getters and Setters
}

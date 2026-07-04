package com.dev.delta.dto.output;

public class MediaTypeDto {
    private String type;
    private int count;

    // Constructor
    public MediaTypeDto(String type, int count) {
        this.type = type;
        this.count = count;
    }

    // Getters and Setters
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}


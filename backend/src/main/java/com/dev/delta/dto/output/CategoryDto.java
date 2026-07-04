package com.dev.delta.dto.output;

public class CategoryDto {
    private String category;
    private int items;

    // Constructor
    public CategoryDto(String category, int items) {
        this.category = category;
        this.items = items;
    }

    // Getters and Setters
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getItems() {
        return items;
    }

    public void setItems(int items) {
        this.items = items;
    }
}


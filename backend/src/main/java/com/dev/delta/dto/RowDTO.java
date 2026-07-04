package com.dev.delta.dto;

import com.dev.delta.entities.Departement;
import com.dev.delta.entities.Row;
import com.dev.delta.entities.Shelf;
import com.dev.delta.repositories.DepartmentRepository;
import com.dev.delta.repositories.RowRepository;
import com.dev.delta.repositories.ShelfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RowDTO implements DTO {

    @Autowired
    RowRepository rowRepository;

    @Autowired
    ShelfRepository shelfRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public void populate() {
        // Fetch shelves and departments from repositories
        List<Shelf> shelves = shelfRepository.findAll();
        List<Departement> departments = departmentRepository.findAll();

        // Check if shelves and departments exist
        if (shelves.isEmpty() || departments.isEmpty()) {
            throw new RuntimeException("No shelves or departments available to assign rows.");
        }

        // Create and save rows
        createAndSaveRow("Row 1", 1, shelves.get(0), departments.get(0));
        createAndSaveRow("Row 2", 2, shelves.get(1), departments.get(1));
        createAndSaveRow("Row 3", 3, shelves.get(2), departments.get(2));
        createAndSaveRow("Row 4", 4, shelves.get(3), departments.get(3));
        createAndSaveRow("Row 5", 5, shelves.get(4), departments.get(4));
        createAndSaveRow("Row 6", 6, shelves.get(0), departments.get(1));
        createAndSaveRow("Row 7", 7, shelves.get(1), departments.get(2));
        createAndSaveRow("Row 8", 8, shelves.get(2), departments.get(3));
        createAndSaveRow("Row 9", 9, shelves.get(3), departments.get(4));
        createAndSaveRow("Row 10", 10, shelves.get(4), departments.get(0));
        createAndSaveRow("Row 11", 11, shelves.get(0), departments.get(2));
        createAndSaveRow("Row 12", 12, shelves.get(1), departments.get(3));
        createAndSaveRow("Row 13", 13, shelves.get(2), departments.get(4));
        createAndSaveRow("Row 14", 14, shelves.get(3), departments.get(0));
        createAndSaveRow("Row 15", 15, shelves.get(4), departments.get(1));
    }

    private void createAndSaveRow(String name, int position, Shelf shelf, Departement department) {
        Row row = new Row();
        row.setRowName(name);
        row.setPosition(position);
        row.setShelf(shelf);
        row.setDepartment(department);
        rowRepository.save(row);
    }
}

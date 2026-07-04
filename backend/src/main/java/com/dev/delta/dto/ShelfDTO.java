package com.dev.delta.dto;

import com.dev.delta.entities.Departement;
import com.dev.delta.entities.Shelf;
import com.dev.delta.repositories.ShelfRepository;
import com.dev.delta.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ShelfDTO implements DTO {

    @Autowired
    ShelfRepository shelfRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public void populate() {
        // Fetch departments from repository
        List<Departement> departments = departmentRepository.findAll();

        // Check if departments exist
        if (departments.isEmpty()) {
            throw new RuntimeException("No departments available to assign shelves.");
        }

        // Create and save shelves
        createAndSaveShelf("Shelf 1", "SHE001", "Building A", 100, "Wood", "Brown", departments.get(0));
        createAndSaveShelf("Shelf 2", "SHE002", "Building B", 150, "Metal", "Black", departments.get(1));
        createAndSaveShelf("Shelf 3", "SHE003", "Building C", 200, "Plastic", "White", departments.get(2));
        createAndSaveShelf("Shelf 4", "SHE004", "Building D", 250, "Wood", "Dark Brown", departments.get(3));
        createAndSaveShelf("Shelf 5", "SHE005", "Building E", 300, "Metal", "Silver", departments.get(4));
        createAndSaveShelf("Shelf 6", "SHE006", "Building F", 350, "Plastic", "Gray", departments.get(0));
        createAndSaveShelf("Shelf 7", "SHE007", "Building G", 400, "Wood", "Light Brown", departments.get(1));
        createAndSaveShelf("Shelf 8", "SHE008", "Building H", 450, "Metal", "Gold", departments.get(2));
        createAndSaveShelf("Shelf 9", "SHE009", "Building I", 500, "Plastic", "Beige", departments.get(3));
        createAndSaveShelf("Shelf 10", "SHE010", "Building J", 550, "Wood", "Oak", departments.get(4));
        createAndSaveShelf("Shelf 11", "SHE011", "Building A", 600, "Metal", "Copper", departments.get(0));
        createAndSaveShelf("Shelf 12", "SHE012", "Building B", 650, "Plastic", "Blue", departments.get(1));
        createAndSaveShelf("Shelf 13", "SHE013", "Building C", 700, "Wood", "Cherry", departments.get(2));
        createAndSaveShelf("Shelf 14", "SHE014", "Building D", 750, "Metal", "Bronze", departments.get(3));
        createAndSaveShelf("Shelf 15", "SHE015", "Building E", 800, "Plastic", "Green", departments.get(4));
    }

    private void createAndSaveShelf(String name, String code, String location, int capacity, String material, String color, Departement department) {
        Shelf shelf = new Shelf();
        shelf.setShelfName(name);
        shelf.setShelfCode(code);
        shelf.setLocation(location);
        shelf.setCapacity(capacity);
        shelf.setMaterial(material);
        shelf.setColor(color);
        shelf.setDepartment(department);
        shelfRepository.save(shelf);
    }
}

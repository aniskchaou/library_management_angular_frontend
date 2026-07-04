package com.dev.delta.dto;

import com.dev.delta.dto.DTO;
import com.dev.delta.entities.PhysicalDescription;
import com.dev.delta.repositories.PhysicalDescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhysicalDescriptionDTO implements DTO {

    @Autowired
    private PhysicalDescriptionRepository physicalDescriptionRepository;

    @Override
    public void populate() {
        for (int i = 1; i <= 15; i++) {
            PhysicalDescription physicalDescription = new PhysicalDescription();
            physicalDescription.setHeight(20 + i); // Example values
            physicalDescription.setWidth(15 + i);
            physicalDescription.setThickness(5 + i);
            physicalDescription.setWeight(300 + (i * 10));
            physicalDescription.setPageCount(200 + (i * 10));
            physicalDescription.setBindingType(i % 2 == 0 ? "hardcover" : "paperback");

            physicalDescriptionRepository.save(physicalDescription);
        }
    }
}


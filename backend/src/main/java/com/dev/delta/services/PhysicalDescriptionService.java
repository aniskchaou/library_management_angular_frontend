package com.dev.delta.services;

import com.dev.delta.entities.PhysicalDescription;
import com.dev.delta.repositories.PhysicalDescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PhysicalDescriptionService {

    @Autowired
    private PhysicalDescriptionRepository physicalDescriptionRepository;

    public List<PhysicalDescription> findAll() {
        return physicalDescriptionRepository.findAll();
    }

    public Optional<PhysicalDescription> findById(Long id) {
        return physicalDescriptionRepository.findById(id);
    }

    public PhysicalDescription save(PhysicalDescription physicalDescription) {
        return physicalDescriptionRepository.save(physicalDescription);
    }

    public void deleteById(Long id) {
        physicalDescriptionRepository.deleteById(id);
    }
}


package com.dev.delta.services;

import com.dev.delta.entities.CirculationSettings;
import com.dev.delta.repositories.CirculationSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CirculationSettingsService {

    @Autowired
    private CirculationSettingsRepository circulationSettingsRepository;

    public List<CirculationSettings> findAll() {
        return circulationSettingsRepository.findAll();
    }

    public Optional<CirculationSettings> findById(Long id) {
        return circulationSettingsRepository.findById(id);
    }

    public CirculationSettings save(CirculationSettings circulationSettings) {
        return circulationSettingsRepository.save(circulationSettings);
    }

    public void deleteById(Long id) {
        circulationSettingsRepository.deleteById(id);
    }
}


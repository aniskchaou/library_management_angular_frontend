package com.dev.delta.services;

import com.dev.delta.entities.DisplaySettings;
import com.dev.delta.repositories.DisplaySettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DisplaySettingsService {

    @Autowired
    private DisplaySettingsRepository displaySettingsRepository;

    public List<DisplaySettings> findAll() {
        return displaySettingsRepository.findAll();
    }

    public Optional<DisplaySettings> findById(Long id) {
        return displaySettingsRepository.findById(id);
    }

    public DisplaySettings save(DisplaySettings displaySettings) {
        return displaySettingsRepository.save(displaySettings);
    }

    public void deleteById(Long id) {
        displaySettingsRepository.deleteById(id);
    }
}


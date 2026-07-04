package com.dev.delta.services;

import com.dev.delta.entities.UserSettings;
import com.dev.delta.repositories.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserSettingsService {

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    public List<UserSettings> findAll() {
        return userSettingsRepository.findAll();
    }

    public Optional<UserSettings> findById(Long id) {
        return userSettingsRepository.findById(id);
    }

    public UserSettings save(UserSettings userSettings) {
        return userSettingsRepository.save(userSettings);
    }

    public void deleteById(Long id) {
        userSettingsRepository.deleteById(id);
    }
}


package com.dev.delta.services;

import com.dev.delta.entities.NotificationSettings;
import com.dev.delta.repositories.NotificationSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationSettingsService {

    @Autowired
    private NotificationSettingsRepository notificationSettingsRepository;

    public List<NotificationSettings> findAll() {
        return notificationSettingsRepository.findAll();
    }

    public Optional<NotificationSettings> findById(Long id) {
        return notificationSettingsRepository.findById(id);
    }

    public NotificationSettings save(NotificationSettings notificationSettings) {
        return notificationSettingsRepository.save(notificationSettings);
    }

    public void deleteById(Long id) {
        notificationSettingsRepository.deleteById(id);
    }
}


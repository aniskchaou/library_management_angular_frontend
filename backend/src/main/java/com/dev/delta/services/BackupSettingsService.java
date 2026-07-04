package com.dev.delta.services;

import com.dev.delta.entities.BackupSettings;
import com.dev.delta.repositories.BackupSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BackupSettingsService {

    @Autowired
    private BackupSettingsRepository backupSettingsRepository;

    public List<BackupSettings> findAll() {
        return backupSettingsRepository.findAll();
    }

    public Optional<BackupSettings> findById(Long id) {
        return backupSettingsRepository.findById(id);
    }

    public BackupSettings save(BackupSettings backupSettings) {
        return backupSettingsRepository.save(backupSettings);
    }

    public void deleteById(Long id) {
        backupSettingsRepository.deleteById(id);
    }
}


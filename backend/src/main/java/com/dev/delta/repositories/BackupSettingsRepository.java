package com.dev.delta.repositories;

import com.dev.delta.entities.BackupSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackupSettingsRepository extends JpaRepository<BackupSettings, Long> {
}


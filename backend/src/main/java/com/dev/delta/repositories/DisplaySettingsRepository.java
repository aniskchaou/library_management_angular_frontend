package com.dev.delta.repositories;

import com.dev.delta.entities.DisplaySettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisplaySettingsRepository extends JpaRepository<DisplaySettings, Long> {
}


package com.dev.delta.repositories;

import com.dev.delta.entities.CirculationSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CirculationSettingsRepository extends JpaRepository<CirculationSettings, Long> {
}


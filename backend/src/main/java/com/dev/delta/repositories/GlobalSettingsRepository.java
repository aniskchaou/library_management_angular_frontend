package com.dev.delta.repositories;

import com.dev.delta.entities.GlobalSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GlobalSettingsRepository extends JpaRepository<GlobalSettings, Long> {
    // Singleton pattern — always retrieve id=1
    Optional<GlobalSettings> findFirstByOrderByIdAsc();
}

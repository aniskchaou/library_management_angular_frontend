package com.dev.delta.repositories;

import com.dev.delta.entities.BookingSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingSettingsRepository extends JpaRepository<BookingSettings, Long> {
}


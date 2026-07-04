package com.dev.delta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entities.CirculationStatus;

public interface CirculationStatusRepository extends JpaRepository<CirculationStatus, Long> {

    CirculationStatus findByName(String statusName);
}

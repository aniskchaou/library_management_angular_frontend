package com.dev.delta.repositories;

import com.dev.delta.entities.Hold;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoldRepository extends JpaRepository<Hold, Long> {
}


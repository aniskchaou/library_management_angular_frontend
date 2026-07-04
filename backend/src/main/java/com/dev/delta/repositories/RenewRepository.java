package com.dev.delta.repositories;

import com.dev.delta.entities.Renewal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RenewRepository extends JpaRepository<Renewal, Long> {
}


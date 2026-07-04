package com.dev.delta.repositories;

import com.dev.delta.entities.Overdue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OverdueRepository extends JpaRepository<Overdue, Long> {
}


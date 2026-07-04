package com.dev.delta.repositories;

import com.dev.delta.entities.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {

    List<Plan> findByIsActiveTrue();

    Optional<Plan> findByName(String name);
}

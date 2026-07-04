package com.dev.delta.repositories;

import com.dev.delta.entities.PurchaseSuggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseSuggestionRepository extends JpaRepository<PurchaseSuggestion, Long> {
}


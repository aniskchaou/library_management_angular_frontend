package com.dev.delta.repositories;

import com.dev.delta.entities.Basket;
import com.dev.delta.entities.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Budget b SET b.lockBudget = true WHERE b.id = ?1")
    void lockBudgetById(Long budgetId);
}


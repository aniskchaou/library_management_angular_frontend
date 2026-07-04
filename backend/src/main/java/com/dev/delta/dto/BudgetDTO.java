package com.dev.delta.dto;

import com.dev.delta.entities.Budget;
import com.dev.delta.repositories.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BudgetDTO implements DTO {

    @Autowired
    BudgetRepository budgetRepository;

    @Override
    public void populate() {
        // Create and save budgets
        createAndSaveBudget(LocalDate.of(2024, 1, 1), LocalDate.of(2024, 6, 30), "Q1 2024 Budget", 50000.00, true, false);
        createAndSaveBudget(LocalDate.of(2024, 7, 1), LocalDate.of(2024, 12, 31), "Q2 2024 Budget", 60000.00, true, false);
        createAndSaveBudget(LocalDate.of(2025, 1, 1), LocalDate.of(2025, 6, 30), "Q1 2025 Budget", 55000.00, true, true);
        createAndSaveBudget(LocalDate.of(2025, 7, 1), LocalDate.of(2025, 12, 31), "Q2 2025 Budget", 65000.00, false, false);
        createAndSaveBudget(LocalDate.of(2026, 1, 1), LocalDate.of(2026, 6, 30), "Q1 2026 Budget", 70000.00, true, false);
        createAndSaveBudget(LocalDate.of(2026, 7, 1), LocalDate.of(2026, 12, 31), "Q2 2026 Budget", 75000.00, true, true);
        createAndSaveBudget(LocalDate.of(2027, 1, 1), LocalDate.of(2027, 6, 30), "Q1 2027 Budget", 80000.00, false, false);
        createAndSaveBudget(LocalDate.of(2027, 7, 1), LocalDate.of(2027, 12, 31), "Q2 2027 Budget", 85000.00, true, false);
        createAndSaveBudget(LocalDate.of(2028, 1, 1), LocalDate.of(2028, 6, 30), "Q1 2028 Budget", 90000.00, false, true);
        createAndSaveBudget(LocalDate.of(2028, 7, 1), LocalDate.of(2028, 12, 31), "Q2 2028 Budget", 95000.00, true, false);
        createAndSaveBudget(LocalDate.of(2029, 1, 1), LocalDate.of(2029, 6, 30), "Q1 2029 Budget", 100000.00, true, true);
        createAndSaveBudget(LocalDate.of(2029, 7, 1), LocalDate.of(2029, 12, 31), "Q2 2029 Budget", 105000.00, false, false);
        createAndSaveBudget(LocalDate.of(2030, 1, 1), LocalDate.of(2030, 6, 30), "Q1 2030 Budget", 110000.00, true, true);
        createAndSaveBudget(LocalDate.of(2030, 7, 1), LocalDate.of(2030, 12, 31), "Q2 2030 Budget", 115000.00, true, false);
        createAndSaveBudget(LocalDate.of(2031, 1, 1), LocalDate.of(2031, 6, 30), "Q1 2031 Budget", 120000.00, false, true);
    }

    private void createAndSaveBudget(LocalDate startDate, LocalDate endDate, String description, Double totalAmount, Boolean makeBudgetActive, Boolean lockBudget) {
        Budget budget = new Budget();
        budget.setStartDate(startDate);
        budget.setEndDate(endDate);
        budget.setDescription(description);
        budget.setTotalAmount(totalAmount);
        budget.setMakeBudgetActive(makeBudgetActive);
        budget.setLockBudget(lockBudget);
        budgetRepository.save(budget);
    }
}

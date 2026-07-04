package com.dev.delta.dto;

import com.dev.delta.entities.Fund;
import com.dev.delta.entities.Budget;
import com.dev.delta.repositories.FundRepository;
import com.dev.delta.repositories.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import com.dev.delta.entities.Budget;
import com.dev.delta.entities.Fund;
import com.dev.delta.repositories.BudgetRepository;
import com.dev.delta.repositories.FundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


import com.dev.delta.entities.Budget;
import com.dev.delta.entities.Fund;
import com.dev.delta.repositories.BudgetRepository;
import com.dev.delta.repositories.FundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundDTO implements DTO {

    @Autowired
    private FundRepository fundRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @Override
    public void populate() {
        // Fetch budgets from repository
        List<Budget> budgets = budgetRepository.findAll();

        // Check if budgets exist
        if (budgets.isEmpty()) {
            throw new RuntimeException("No budgets available to assign funds.");
        }

        // Create and save funds
        createAndSaveFund("FND001", "Project A Fund", 5000.00, 20, "John Doe", "Initial funding for project A", budgets.get(0));
        createAndSaveFund("FND002", "Project B Fund", 10000.00, 15, "Jane Smith", "Additional funding for project B", budgets.get(1));
        createAndSaveFund("FND003", "Project C Contingency Fund", 15000.00, 10, "Mark Johnson", "Contingency fund for project C", budgets.get(2));
        createAndSaveFund("FND004", "Project D Emergency Fund", 20000.00, 25, "Emily Davis", "Emergency fund for project D", budgets.get(3));
        createAndSaveFund("FND005", "Project E Final Fund", 25000.00, 30, "Michael Brown", "Final funding for project E", budgets.get(4));
    }

    private void createAndSaveFund(String fundCode, String fundName, Double amount, Integer warningAtPercentage, String owner, String notes, Budget budget) {
        Fund fund = new Fund();
        fund.setFundCode(fundCode);
        fund.setFundName(fundName);
        fund.setAmount(amount);
        fund.setWarningAtPercentage(warningAtPercentage);
        fund.setWarningAtAmount(amount * warningAtPercentage / 100);
        fund.setOwner(owner);
        fund.setNotes(notes);
        fund.setBudget(budget);
        fundRepository.save(fund);
    }
}



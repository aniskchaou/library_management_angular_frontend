package com.dev.delta.controllers;

import com.dev.delta.entities.Budget;
import com.dev.delta.services.BudgetService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("budget")
@CrossOrigin(origins = "*")
@Api(value = "BudgetController", description = "Controller for Budget Management")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @ApiOperation(value = "Add Budget")
    @PostMapping("/create")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 400, message = "validation error")
    })
    public ResponseEntity<?> addBudget(@Validated @RequestBody Budget budget, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Budget newBudget = budgetService.save(budget);
        return new ResponseEntity<>(newBudget, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Budgets")
    @GetMapping("/all")
    public Iterable<Budget> getAllBudgets() {
        return budgetService.findAll();
    }

    @ApiOperation(value = "Get Budget by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable Long id) throws Exception {
        Budget budget = budgetService.findById(id)
                .orElseThrow(() -> new Exception("Budget not found"));
        return new ResponseEntity<>(budget, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Budget by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBudget(@PathVariable Long id) throws Exception {
        budgetService.deleteById(id);
        return new ResponseEntity<>("Budget was deleted", HttpStatus.OK);
    }

    @GetMapping("/{id}/lock")
    public ResponseEntity<String> lockBudget(@PathVariable Long id) {
        try {
            budgetService.lockBudget(id);
            return ResponseEntity.ok("Budget has been successfully locked.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error locking budget: " + e.getMessage());
        }
    }
}

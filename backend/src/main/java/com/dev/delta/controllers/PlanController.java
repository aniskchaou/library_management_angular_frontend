package com.dev.delta.controllers;

import com.dev.delta.entities.Plan;
import com.dev.delta.repositories.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class PlanController {

    @Autowired
    private PlanRepository planRepo;

    /** Public endpoint — anyone can view available plans */
    @GetMapping("/api/plans/public")
    public List<Plan> getPublicPlans() {
        return planRepo.findByIsActiveTrue();
    }

    /** Super-admin: full CRUD */
    @GetMapping("/api/super-admin/plans")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public List<Plan> getAll() {
        return planRepo.findAll();
    }

    @GetMapping("/api/super-admin/plans/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Plan> getById(@PathVariable Long id) {
        return planRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/super-admin/plans")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> create(@RequestBody Plan plan) {
        if (planRepo.findByName(plan.getName()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Plan name already exists"));
        }
        return ResponseEntity.ok(planRepo.save(plan));
    }

    @PutMapping("/api/super-admin/plans/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Plan updates) {
        return planRepo.findById(id).map(plan -> {
            if (updates.getName() != null) plan.setName(updates.getName());
            if (updates.getDescription() != null) plan.setDescription(updates.getDescription());
            if (updates.getPriceMonthly() != null) plan.setPriceMonthly(updates.getPriceMonthly());
            if (updates.getPriceYearly() != null) plan.setPriceYearly(updates.getPriceYearly());
            plan.setMaxUsers(updates.getMaxUsers() > 0 ? updates.getMaxUsers() : plan.getMaxUsers());
            plan.setMaxBooks(updates.getMaxBooks() > 0 ? updates.getMaxBooks() : plan.getMaxBooks());
            plan.setMaxStorageGb(updates.getMaxStorageGb() > 0 ? updates.getMaxStorageGb() : plan.getMaxStorageGb());
            plan.setCanUseAnalytics(updates.isCanUseAnalytics());
            plan.setCanUseApi(updates.isCanUseApi());
            plan.setCanUseSso(updates.isCanUseSso());
            plan.setCanUseCustomBranding(updates.isCanUseCustomBranding());
            if (updates.getStripePriceIdMonthly() != null) plan.setStripePriceIdMonthly(updates.getStripePriceIdMonthly());
            if (updates.getStripePriceIdYearly() != null) plan.setStripePriceIdYearly(updates.getStripePriceIdYearly());
            return ResponseEntity.ok(planRepo.save(plan));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/api/super-admin/plans/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return planRepo.findById(id).map(plan -> {
            plan.setActive(false);
            planRepo.save(plan);
            return ResponseEntity.ok(Map.of("message", "Plan deactivated"));
        }).orElse(ResponseEntity.notFound().build());
    }
}

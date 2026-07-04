package com.dev.delta.controllers;

import com.dev.delta.entities.Subscription;
import com.dev.delta.repositories.*;
import com.dev.delta.services.StripeSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/super-admin/saas-analytics")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SaasAnalyticsController {

    @Autowired private OrganizationRepository orgRepo;
    @Autowired private SubscriptionRepository subscriptionRepo;
    @Autowired private UserRepository userRepository;
    @Autowired private PlanRepository planRepo;
    @Autowired private StripeSubscriptionService stripeService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        Map<String, Object> data = new HashMap<>();

        data.put("totalOrganizations", orgRepo.count());
        data.put("activeOrganizations", orgRepo.countActive());
        data.put("suspendedOrganizations",
                orgRepo.findByStatus(com.dev.delta.entities.Organization.OrgStatus.SUSPENDED).size());
        data.put("totalUsers", userRepository.count());

        BigDecimal mrr = subscriptionRepo.calculateMrr();
        data.put("mrr", mrr);
        data.put("arr", mrr.multiply(BigDecimal.valueOf(12)));
        data.put("activeSubscriptions", subscriptionRepo.countActiveSubscriptions());

        long churn30d = subscriptionRepo.countChurnedSince(LocalDateTime.now().minusDays(30));
        long churn7d = subscriptionRepo.countChurnedSince(LocalDateTime.now().minusDays(7));
        data.put("churnLast30Days", churn30d);
        data.put("churnLast7Days", churn7d);

        // Expiring in 7 days
        List<Subscription> expiring = subscriptionRepo.findByCurrentPeriodEndBefore(LocalDate.now().plusDays(7));
        data.put("expiringSubscriptions7d", expiring.size());

        return ResponseEntity.ok(data);
    }

    @GetMapping("/revenue")
    public ResponseEntity<Map<String, Object>> revenue() {
        BigDecimal mrr = subscriptionRepo.calculateMrr();
        Map<String, Object> data = new HashMap<>();
        data.put("mrr", mrr);
        data.put("arr", mrr.multiply(BigDecimal.valueOf(12)));
        data.put("activeSubscriptions", subscriptionRepo.countActiveSubscriptions());
        return ResponseEntity.ok(data);
    }

    @GetMapping("/by-plan")
    public ResponseEntity<?> byPlan() {
        List<Map<String, Object>> result = planRepo.findAll().stream().map(plan -> {
            Map<String, Object> entry = new HashMap<>();
            entry.put("planId", plan.getId());
            entry.put("planName", plan.getName());
            long count = subscriptionRepo.findByStatus(Subscription.SubStatus.ACTIVE)
                    .stream().filter(s -> plan.getId().equals(s.getPlanId())).count();
            entry.put("activeSubscriptions", count);
            entry.put("mrr", plan.getPriceMonthly().multiply(BigDecimal.valueOf(count)));
            return entry;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/user-analytics")
    public ResponseEntity<Map<String, Object>> userAnalytics() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalUsers", userRepository.count());
        // Growth: new users in last 30 days would require createdAt on User entity
        // Returning basic stats for now
        data.put("superAdmins", userRepository.findAll().stream()
                .filter(u -> u.isSuperAdmin()).count());
        return ResponseEntity.ok(data);
    }

    @GetMapping("/expiring-subscriptions")
    public ResponseEntity<?> expiringSubscriptions(
            @RequestParam(defaultValue = "30") int days) {
        List<Subscription> expiring = subscriptionRepo.findByCurrentPeriodEndBefore(
                LocalDate.now().plusDays(days));
        return ResponseEntity.ok(expiring);
    }
}

package com.dev.delta.controllers;

import com.dev.delta.repositories.OrganizationRepository;
import com.dev.delta.repositories.SubscriptionRepository;
import com.dev.delta.repositories.UserRepository;
import com.dev.delta.services.StripeSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/super-admin/saas-analytics")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SaasAnalyticsController {

    @Autowired
    private OrganizationRepository orgRepo;

    @Autowired
    private SubscriptionRepository subscriptionRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StripeSubscriptionService stripeService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        Map<String, Object> data = new HashMap<>();

        // Organizations
        data.put("totalOrganizations", orgRepo.count());
        data.put("activeOrganizations", orgRepo.countActive());
        data.put("suspendedOrganizations",
                orgRepo.findByStatus(com.dev.delta.entities.Organization.OrgStatus.SUSPENDED).size());

        // Users
        data.put("totalUsers", userRepository.count());

        // Subscriptions / Revenue
        BigDecimal mrr = subscriptionRepo.calculateMrr();
        data.put("mrr", mrr);
        data.put("arr", mrr.multiply(BigDecimal.valueOf(12)));
        data.put("activeSubscriptions", subscriptionRepo.countActiveSubscriptions());

        // Churn
        long churn30d = subscriptionRepo.countChurnedSince(LocalDateTime.now().minusDays(30));
        long churn7d = subscriptionRepo.countChurnedSince(LocalDateTime.now().minusDays(7));
        data.put("churnLast30Days", churn30d);
        data.put("churnLast7Days", churn7d);

        return ResponseEntity.ok(data);
    }

    @GetMapping("/revenue")
    public ResponseEntity<Map<String, Object>> revenue() {
        BigDecimal mrr = subscriptionRepo.calculateMrr();
        Map<String, Object> data = new HashMap<>();
        data.put("mrr", mrr);
        data.put("arr", mrr.multiply(BigDecimal.valueOf(12)));
        data.put("activeSubscriptions", subscriptionRepo.countActiveSubscriptions());
        data.put("totalRevenue", mrr); // In a real system, aggregate from invoices
        return ResponseEntity.ok(data);
    }
}

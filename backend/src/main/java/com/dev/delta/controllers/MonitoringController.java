package com.dev.delta.controllers;

import com.dev.delta.repositories.ApiRequestLogRepository;
import com.dev.delta.repositories.OrganizationRepository;
import com.dev.delta.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.sql.Connection;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/super-admin/monitoring")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class MonitoringController {

    @Autowired private ApiRequestLogRepository apiLogRepo;
    @Autowired private DataSource dataSource;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> result = new HashMap<>();

        // DB health
        boolean dbOk = false;
        try (Connection conn = dataSource.getConnection()) {
            dbOk = conn.isValid(2);
        } catch (Exception e) { /* db down */ }
        result.put("database", dbOk ? "UP" : "DOWN");

        // JVM memory
        MemoryMXBean mem = ManagementFactory.getMemoryMXBean();
        Map<String, Object> jvm = new HashMap<>();
        jvm.put("heapUsedMb", mem.getHeapMemoryUsage().getUsed() / 1_048_576);
        jvm.put("heapMaxMb", mem.getHeapMemoryUsage().getMax() / 1_048_576);
        jvm.put("nonHeapUsedMb", mem.getNonHeapMemoryUsage().getUsed() / 1_048_576);
        result.put("jvm", jvm);

        // Uptime
        result.put("uptimeMs", ManagementFactory.getRuntimeMXBean().getUptime());

        // Request stats (last 24h)
        LocalDateTime since = LocalDateTime.now().minusHours(24);
        result.put("requests24h", apiLogRepo.countSince(since));
        result.put("errors24h", apiLogRepo.countErrorsSince(since));
        Double avgResp = apiLogRepo.avgResponseTimeSince(since);
        result.put("avgResponseMs", avgResp != null ? Math.round(avgResp) : 0);

        result.put("status", dbOk ? "UP" : "DEGRADED");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/api-requests")
    public ResponseEntity<?> apiRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok(apiLogRepo.findAllByOrderByCreatedAtDesc(
                org.springframework.data.domain.PageRequest.of(page, size)));
    }

    @GetMapping("/top-endpoints")
    public ResponseEntity<?> topEndpoints() {
        LocalDateTime since = LocalDateTime.now().minusDays(7);
        java.util.List<Object[]> rows = apiLogRepo.topEndpointsSince(since,
                org.springframework.data.domain.PageRequest.of(0, 20));
        java.util.List<java.util.Map<String, Object>> result = rows.stream().map(r -> Map.of("path", r[0], "count", r[1])).collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(result);
    }
}

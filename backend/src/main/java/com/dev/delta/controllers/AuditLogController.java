package com.dev.delta.controllers;

import com.dev.delta.entities.AuditLog;
import com.dev.delta.repositories.AuditLogRepository;
import com.dev.delta.services.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/super-admin/audit-logs")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class AuditLogController {

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private AuditLogRepository auditLogRepo;

    @GetMapping
    public Page<AuditLog> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return auditLogService.getAll(PageRequest.of(page, size));
    }

    @GetMapping("/organization/{orgId}")
    public Page<AuditLog> getByOrg(@PathVariable Long orgId,
                                   @RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "50") int size) {
        return auditLogService.getByOrganization(orgId, PageRequest.of(page, size));
    }

    @GetMapping("/user/{userId}")
    public Page<AuditLog> getByUser(@PathVariable Long userId,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "50") int size) {
        return auditLogService.getByActor(userId, PageRequest.of(page, size));
    }

    @GetMapping("/login-history")
    public Page<AuditLog> loginHistory(
            @RequestParam(required = false) String username,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size, org.springframework.data.domain.Sort.by("createdAt").descending());
        if (username != null && !username.isEmpty()) {
            return auditLogRepo.findByActionAndActorUsername(
                    AuditLog.AuditAction.LOGIN, username, pageable);
        }
        return auditLogRepo.findByAction(AuditLog.AuditAction.LOGIN, pageable);
    }

    @GetMapping("/security-events")
    public Page<AuditLog> securityEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return auditLogRepo.findByActionIn(
                java.util.Arrays.asList(
                    AuditLog.AuditAction.LOGIN,
                    AuditLog.AuditAction.LOGOUT,
                    AuditLog.AuditAction.LOCK_USER,
                    AuditLog.AuditAction.UNLOCK_USER,
                    AuditLog.AuditAction.RESET_PASSWORD,
                    AuditLog.AuditAction.IMPERSONATE
                ),
                PageRequest.of(page, size, Sort.by("createdAt").descending())
        );
    }
}

package com.dev.delta.controllers;

import com.dev.delta.entities.AuditLog;
import com.dev.delta.services.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/super-admin/audit-logs")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class AuditLogController {

    @Autowired
    private AuditLogService auditLogService;

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
}

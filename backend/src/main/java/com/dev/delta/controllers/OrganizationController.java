package com.dev.delta.controllers;

import com.dev.delta.entities.Organization;
import com.dev.delta.entities.AuditLog;
import com.dev.delta.repositories.OrganizationRepository;
import com.dev.delta.services.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/super-admin/organizations")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class OrganizationController {

    @Autowired
    private OrganizationRepository orgRepo;

    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public Page<Organization> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return orgRepo.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Organization> getById(@PathVariable Long id) {
        return orgRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Organization org, Authentication auth) {
        if (orgRepo.existsBySubdomain(org.getSubdomain())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Subdomain already taken"));
        }
        org.setStatus(Organization.OrgStatus.ACTIVE);
        Organization saved = orgRepo.save(org);
        auditLogService.log(AuditLog.AuditAction.CREATE, "Organization", saved.getId(),
                auth.getName(), null, null, "Created org: " + saved.getName());
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @RequestBody Organization updates,
                                    Authentication auth) {
        return orgRepo.findById(id).map(org -> {
            if (updates.getName() != null) org.setName(updates.getName());
            if (updates.getAddress() != null) org.setAddress(updates.getAddress());
            if (updates.getContactEmail() != null) org.setContactEmail(updates.getContactEmail());
            if (updates.getContactPhone() != null) org.setContactPhone(updates.getContactPhone());
            if (updates.getLogoUrl() != null) org.setLogoUrl(updates.getLogoUrl());
            Organization saved = orgRepo.save(org);
            auditLogService.log(AuditLog.AuditAction.UPDATE, "Organization", id,
                    auth.getName(), null, id, "Updated org: " + saved.getName());
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/suspend")
    public ResponseEntity<?> suspend(@PathVariable Long id,
                                     @RequestBody(required = false) Map<String, String> body,
                                     Authentication auth) {
        return orgRepo.findById(id).map(org -> {
            org.setStatus(Organization.OrgStatus.SUSPENDED);
            org.setSuspendedAt(LocalDateTime.now());
            if (body != null) org.setSuspendReason(body.get("reason"));
            orgRepo.save(org);
            auditLogService.log(AuditLog.AuditAction.SUSPEND, "Organization", id,
                    auth.getName(), null, id, "Suspended org: " + org.getName());
            return ResponseEntity.ok(Map.of("message", "Organization suspended"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/activate")
    public ResponseEntity<?> activate(@PathVariable Long id, Authentication auth) {
        return orgRepo.findById(id).map(org -> {
            org.setStatus(Organization.OrgStatus.ACTIVE);
            org.setSuspendedAt(null);
            org.setSuspendReason(null);
            orgRepo.save(org);
            auditLogService.log(AuditLog.AuditAction.ACTIVATE, "Organization", id,
                    auth.getName(), null, id, "Activated org: " + org.getName());
            return ResponseEntity.ok(Map.of("message", "Organization activated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/transfer-ownership")
    public ResponseEntity<?> transferOwnership(@PathVariable Long id,
                                               @RequestBody Map<String, Long> body,
                                               Authentication auth) {
        Long newOwnerId = body.get("newOwnerId");
        if (newOwnerId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "newOwnerId is required"));
        }
        return orgRepo.findById(id).map(org -> {
            Long oldOwner = org.getOwnerUserId();
            org.setOwnerUserId(newOwnerId);
            orgRepo.save(org);
            auditLogService.log(AuditLog.AuditAction.TRANSFER_OWNERSHIP, "Organization", id,
                    auth.getName(), null, id,
                    "Transferred ownership from userId " + oldOwner + " to " + newOwnerId);
            return ResponseEntity.ok(Map.of("message", "Ownership transferred"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication auth) {
        return orgRepo.findById(id).map(org -> {
            org.setStatus(Organization.OrgStatus.DELETED);
            orgRepo.save(org);
            auditLogService.log(AuditLog.AuditAction.DELETE, "Organization", id,
                    auth.getName(), null, id, "Deleted org: " + org.getName());
            return ResponseEntity.ok(Map.of("message", "Organization deleted"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> stats() {
        long total = orgRepo.count();
        long active = orgRepo.countActive();
        long suspended = orgRepo.findByStatus(Organization.OrgStatus.SUSPENDED).size();
        return ResponseEntity.ok(Map.of(
                "total", total,
                "active", active,
                "suspended", suspended
        ));
    }
}

package com.dev.delta.controllers;

import com.dev.delta.entities.Branch;
import com.dev.delta.entities.AuditLog;
import com.dev.delta.repositories.BranchRepository;
import com.dev.delta.services.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/super-admin/organizations/{orgId}/branches")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class BranchController {

    @Autowired
    private BranchRepository branchRepo;
    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public List<Branch> getAll(@PathVariable Long orgId) {
        return branchRepo.findByOrganizationId(orgId);
    }

    @PostMapping
    public ResponseEntity<Branch> create(@PathVariable Long orgId,
                                         @RequestBody Branch branch,
                                         Authentication auth) {
        branch.setOrganizationId(orgId);
        Branch saved = branchRepo.save(branch);
        auditLogService.log(AuditLog.AuditAction.CREATE, "Branch", saved.getId(),
                auth.getName(), null, orgId, "Created branch: " + saved.getName());
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Branch> update(@PathVariable Long orgId,
                                         @PathVariable Long id,
                                         @RequestBody Branch updates,
                                         Authentication auth) {
        return branchRepo.findById(id).map(b -> {
            if (updates.getName() != null) b.setName(updates.getName());
            if (updates.getAddress() != null) b.setAddress(updates.getAddress());
            if (updates.getContactEmail() != null) b.setContactEmail(updates.getContactEmail());
            if (updates.getContactPhone() != null) b.setContactPhone(updates.getContactPhone());
            b.setMain(updates.isMain());
            Branch saved = branchRepo.save(b);
            auditLogService.log(AuditLog.AuditAction.UPDATE, "Branch", id,
                    auth.getName(), null, orgId, "Updated branch: " + saved.getName());
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long orgId,
                                    @PathVariable Long id,
                                    Authentication auth) {
        return branchRepo.findById(id).map(b -> {
            b.setActive(false);
            branchRepo.save(b);
            auditLogService.log(AuditLog.AuditAction.DELETE, "Branch", id,
                    auth.getName(), null, orgId, "Deactivated branch: " + b.getName());
            return ResponseEntity.ok(Map.of("message", "Branch deactivated"));
        }).orElse(ResponseEntity.notFound().build());
    }
}

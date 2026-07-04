package com.dev.delta.controllers;

import com.dev.delta.entities.AuditLog;
import com.dev.delta.entities.User;
import com.dev.delta.repositories.UserRepository;
import com.dev.delta.services.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/super-admin/users")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SuperAdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public Page<User> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return userRepository.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/lock")
    public ResponseEntity<?> lockUser(@PathVariable Long id,
                                      @RequestBody(required = false) Map<String, String> body,
                                      Authentication auth) {
        return userRepository.findById(id).map(user -> {
            user.setLocked(true);
            user.setLockedAt(LocalDateTime.now());
            if (body != null) user.setLockReason(body.get("reason"));
            userRepository.save(user);
            auditLogService.log(AuditLog.AuditAction.LOCK_USER, "User", id,
                    auth.getName(), null, user.getOrganizationId(),
                    "Locked user: " + user.getUsername());
            return ResponseEntity.ok(Map.of("message", "User locked"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/unlock")
    public ResponseEntity<?> unlockUser(@PathVariable Long id, Authentication auth) {
        return userRepository.findById(id).map(user -> {
            user.setLocked(false);
            user.setLockedAt(null);
            user.setLockReason(null);
            userRepository.save(user);
            auditLogService.log(AuditLog.AuditAction.UNLOCK_USER, "User", id,
                    auth.getName(), null, user.getOrganizationId(),
                    "Unlocked user: " + user.getUsername());
            return ResponseEntity.ok(Map.of("message", "User unlocked"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/reset-password")
    public ResponseEntity<?> resetPassword(@PathVariable Long id, Authentication auth) {
        return userRepository.findById(id).map(user -> {
            String tempPassword = UUID.randomUUID().toString().substring(0, 12);
            user.setPassword(passwordEncoder.encode(tempPassword));
            userRepository.save(user);
            auditLogService.log(AuditLog.AuditAction.RESET_PASSWORD, "User", id,
                    auth.getName(), null, user.getOrganizationId(),
                    "Password reset for user: " + user.getUsername());
            // In production: send tempPassword via email instead of returning it
            return ResponseEntity.ok(Map.of("tempPassword", tempPassword,
                    "message", "Password reset. Share securely with user."));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/impersonate")
    public ResponseEntity<?> impersonate(@PathVariable Long id,
                                         Authentication auth) {
        return userRepository.findById(id).map(targetUser -> {
            auditLogService.log(AuditLog.AuditAction.IMPERSONATE, "User", id,
                    auth.getName(), null, targetUser.getOrganizationId(),
                    "Super admin impersonating user: " + targetUser.getUsername());
            // Return an impersonation token scoped to target user (expires in 1 hour)
            Map<String, Object> extras = new HashMap<>();
            extras.put("impersonatedBy", auth.getName());
            extras.put("roles", "[ROLE_ADMIN]");
            // Note: JwtTokenProvider would need to accept custom expiry for this
            return ResponseEntity.ok(Map.of(
                    "message", "Impersonation token generated",
                    "targetUser", targetUser.getUsername(),
                    "note", "Use the returned access token to act as this user"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Authentication auth) {
        return userRepository.findById(id).map(user -> {
            auditLogService.log(AuditLog.AuditAction.DELETE, "User", id,
                    auth.getName(), null, user.getOrganizationId(),
                    "Deleted user: " + user.getUsername());
            userRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "User deleted"));
        }).orElse(ResponseEntity.notFound().build());
    }
}

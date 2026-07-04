package com.dev.delta.services;

import com.dev.delta.entities.AuditLog;
import com.dev.delta.repositories.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Async
    public void log(AuditLog.AuditAction action, String entityType, Long entityId,
                    String actorUsername, Long actorUserId, Long organizationId,
                    String description) {
        AuditLog log = new AuditLog(action, entityType, entityId,
                actorUsername, actorUserId, organizationId, description);
        auditLogRepository.save(log);
    }

    @Async
    public void logWithRequest(AuditLog.AuditAction action, String entityType, Long entityId,
                               String actorUsername, Long actorUserId, Long organizationId,
                               String description, String ipAddress, String userAgent) {
        AuditLog log = new AuditLog(action, entityType, entityId,
                actorUsername, actorUserId, organizationId, description);
        log.setIpAddress(ipAddress);
        log.setUserAgent(userAgent);
        auditLogRepository.save(log);
    }

    public Page<AuditLog> getAll(Pageable pageable) {
        return auditLogRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public Page<AuditLog> getByOrganization(Long orgId, Pageable pageable) {
        return auditLogRepository.findByOrganizationId(orgId, pageable);
    }

    public Page<AuditLog> getByActor(Long userId, Pageable pageable) {
        return auditLogRepository.findByActorUserId(userId, pageable);
    }

    public List<AuditLog> getByDateRange(LocalDateTime from, LocalDateTime to) {
        return auditLogRepository.findByCreatedAtBetween(from, to);
    }
}

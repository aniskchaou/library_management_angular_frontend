package com.dev.delta.repositories;

import com.dev.delta.entities.ApiRequestLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ApiRequestLogRepository extends JpaRepository<ApiRequestLog, Long> {

    Page<ApiRequestLog> findByOrganizationId(Long organizationId, Pageable pageable);

    Page<ApiRequestLog> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("SELECT COUNT(a) FROM ApiRequestLog a WHERE a.createdAt >= :since")
    long countSince(@org.springframework.data.repository.query.Param("since") LocalDateTime since);

    @Query("SELECT COUNT(a) FROM ApiRequestLog a WHERE a.statusCode >= 400 AND a.createdAt >= :since")
    long countErrorsSince(@org.springframework.data.repository.query.Param("since") LocalDateTime since);

    @Query("SELECT AVG(a.durationMs) FROM ApiRequestLog a WHERE a.createdAt >= :since")
    Double avgResponseTimeSince(@org.springframework.data.repository.query.Param("since") LocalDateTime since);

    @Query("SELECT a.path, COUNT(a) as cnt FROM ApiRequestLog a WHERE a.createdAt >= :since GROUP BY a.path ORDER BY cnt DESC")
    List<Object[]> topEndpointsSince(@org.springframework.data.repository.query.Param("since") LocalDateTime since, Pageable pageable);
}

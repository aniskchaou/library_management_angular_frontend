package com.dev.delta.repositories;

import com.dev.delta.entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Optional<Subscription> findByOrganizationIdAndStatusNot(Long organizationId, Subscription.SubStatus status);

    List<Subscription> findByStatus(Subscription.SubStatus status);

    Optional<Subscription> findByStripeSubscriptionId(String stripeSubscriptionId);

    @Query("SELECT COALESCE(SUM(s.amount), 0) FROM Subscription s WHERE s.status = 'ACTIVE'")
    BigDecimal calculateMrr();

    @Query("SELECT COUNT(s) FROM Subscription s WHERE s.status = 'ACTIVE'")
    long countActiveSubscriptions();

    @Query("SELECT COUNT(s) FROM Subscription s WHERE s.status = 'CANCELED' AND s.canceledAt >= :since")
    long countChurnedSince(@org.springframework.data.repository.query.Param("since") java.time.LocalDateTime since);

    List<Subscription> findByCurrentPeriodEndBefore(LocalDate date);
}

package com.dev.delta.repositories;

import com.dev.delta.entities.WebhookSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WebhookSubscriptionRepository extends JpaRepository<WebhookSubscription, Long> {
    List<WebhookSubscription> findByActiveTrue();
}

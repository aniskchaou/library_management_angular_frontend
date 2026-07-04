package com.dev.delta.services;

import com.dev.delta.entities.WebhookSubscription;
import com.dev.delta.repositories.WebhookSubscriptionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;

/**
 * Delivers webhook payloads to all active subscriptions that have subscribed
 * to a given event type.
 *
 * Usage: inject this service and call fire("book.created", payload).
 */
@Service
public class WebhookDeliveryService {

    @Autowired
    private WebhookSubscriptionRepository subscriptionRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Fire a webhook event to all matching active subscribers (async).
     *
     * @param event   e.g. "book.created", "circulation.issued", "payment.completed"
     * @param payload arbitrary payload map – will be JSON-serialised
     */
    @Async
    public void fire(String event, Map<String, Object> payload) {
        List<WebhookSubscription> subs = subscriptionRepository.findByActiveTrue();
        for (WebhookSubscription sub : subs) {
            if (sub.getEvents() == null) continue;
            boolean matches = java.util.Arrays.stream(sub.getEvents().split(","))
                    .map(String::trim)
                    .anyMatch(e -> e.equals(event) || e.equals("*"));
            if (!matches) continue;
            deliver(sub, event, payload);
        }
    }

    private void deliver(WebhookSubscription sub, String event, Map<String, Object> payload) {
        try {
            Map<String, Object> body = new java.util.LinkedHashMap<>();
            body.put("event", event);
            body.put("timestamp", java.time.Instant.now().toString());
            body.put("data", payload);

            String json = objectMapper.writeValueAsString(body);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Sign with HMAC-SHA256 if secret is configured
            if (sub.getSecret() != null && !sub.getSecret().isEmpty()) {
                String signature = hmacSha256(json, sub.getSecret());
                headers.set("X-Webhook-Signature", "sha256=" + signature);
            }
            headers.set("X-Webhook-Event", event);

            HttpEntity<String> request = new HttpEntity<>(json, headers);
            restTemplate.postForEntity(sub.getUrl(), request, String.class);

        } catch (Exception e) {
            // Non-critical — log and continue
            System.err.printf("[WEBHOOK] Delivery failed to %s for event %s: %s%n",
                    sub.getUrl(), event, e.getMessage());
        }
    }

    private String hmacSha256(String data, String key) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] bytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(bytes);
    }
}

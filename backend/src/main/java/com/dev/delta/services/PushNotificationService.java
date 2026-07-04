package com.dev.delta.services;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Firebase Cloud Messaging service for Web/Mobile push notifications.
 *
 * Prerequisites:
 *   1. Place google-services.json (or serviceAccountKey.json) in src/main/resources/
 *   2. Initialise FirebaseApp in a @Configuration class (see FirebaseConfig.java)
 *   3. Register client FCM tokens via POST /push/register
 *
 * Token storage is currently in-memory; for production, persist tokens in the
 * Member entity or a separate fcm_token table.
 */
@Service
public class PushNotificationService {

    /** In-memory token store: memberId → FCM registration token */
    private final java.util.concurrent.ConcurrentHashMap<Long, String> tokenStore =
            new java.util.concurrent.ConcurrentHashMap<>();

    /** Register or update an FCM token for a member */
    public void registerToken(Long memberId, String token) {
        tokenStore.put(memberId, token);
    }

    /** Remove an FCM token (on logout) */
    public void removeToken(Long memberId) {
        tokenStore.remove(memberId);
    }

    /**
     * Send a push notification to a specific member.
     *
     * @return message ID from FCM, or null if failed / not registered
     */
    public String sendToMember(Long memberId, String title, String body,
                               Map<String, String> data) {
        String token = tokenStore.get(memberId);
        if (token == null) return null;
        return sendToToken(token, title, body, data);
    }

    /**
     * Send to a raw FCM token.
     */
    public String sendToToken(String token, String title, String body,
                              Map<String, String> data) {
        try {
            Message.Builder builder = Message.builder()
                    .setToken(token)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build());
            if (data != null) builder.putAllData(data);
            return FirebaseMessaging.getInstance().send(builder.build());
        } catch (Exception e) {
            System.err.printf("[FCM] Send failed for token %s: %s%n", token, e.getMessage());
            return null;
        }
    }

    /**
     * Broadcast to all registered tokens.
     */
    public int broadcastAll(String title, String body, Map<String, String> data) {
        int sent = 0;
        for (Map.Entry<Long, String> entry : tokenStore.entrySet()) {
            String result = sendToToken(entry.getValue(), title, body, data);
            if (result != null) sent++;
        }
        return sent;
    }

    public Map<Long, String> getTokenStore() {
        return java.util.Collections.unmodifiableMap(tokenStore);
    }
}

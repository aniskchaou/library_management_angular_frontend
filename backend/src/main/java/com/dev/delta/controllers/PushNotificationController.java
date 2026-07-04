package com.dev.delta.controllers;

import com.dev.delta.services.PushNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST endpoints for Firebase Cloud Messaging push notifications.
 * Endpoints: /push/**
 */
@RestController
@RequestMapping("push")
@CrossOrigin(origins = "*")
public class PushNotificationController {

    @Autowired
    private PushNotificationService pushService;

    /**
     * Register an FCM token for a member (call after Firebase getToken() on frontend).
     * Body: { memberId: Long, token: "fcm-token-string" }
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> body) {
        Long memberId = Long.parseLong(body.get("memberId").toString());
        String token  = body.get("token").toString();
        pushService.registerToken(memberId, token);
        return ResponseEntity.ok(Map.of("registered", true));
    }

    /** Unregister token on logout */
    @PostMapping("/unregister/{memberId}")
    public ResponseEntity<?> unregister(@PathVariable Long memberId) {
        pushService.removeToken(memberId);
        return ResponseEntity.ok(Map.of("unregistered", true));
    }

    /**
     * Send a push notification to a specific member.
     * Body: { memberId, title, body, data?: {key: val} }
     */
    @PostMapping("/send/member")
    public ResponseEntity<?> sendToMember(@RequestBody Map<String, Object> body) {
        Long memberId = Long.parseLong(body.get("memberId").toString());
        String title  = body.getOrDefault("title", "Library Notification").toString();
        String text   = body.getOrDefault("body", "").toString();
        @SuppressWarnings("unchecked")
        Map<String, String> data = (Map<String, String>) body.get("data");

        String messageId = pushService.sendToMember(memberId, title, text, data);
        if (messageId != null) {
            return ResponseEntity.ok(Map.of("sent", true, "messageId", messageId));
        }
        return ResponseEntity.ok(Map.of("sent", false,
                "reason", "Member has no registered FCM token"));
    }

    /**
     * Broadcast to all registered tokens (admin use only).
     * Body: { title, body }
     */
    @PostMapping("/broadcast")
    public ResponseEntity<?> broadcast(@RequestBody Map<String, Object> body) {
        String title = body.getOrDefault("title", "Library Announcement").toString();
        String text  = body.getOrDefault("body", "").toString();
        int count = pushService.broadcastAll(title, text, null);
        return ResponseEntity.ok(Map.of("sentTo", count));
    }
}

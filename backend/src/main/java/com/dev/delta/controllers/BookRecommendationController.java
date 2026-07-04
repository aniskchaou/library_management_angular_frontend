package com.dev.delta.controllers;

import com.dev.delta.dto.OpenAIProperties;
import com.dev.delta.entities.Circulation;
import com.dev.delta.repositories.CirculationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

/**
 * AI-powered book recommendation endpoint.
 * Uses the member's borrowing history as context and asks OpenAI GPT to
 * suggest the next books they might enjoy.
 *
 * POST /api/recommendations
 * Body: { memberId: Long, count: int }
 */
@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class BookRecommendationController {

    @Autowired
    private CirculationRepository circulationRepository;

    @Autowired
    private OpenAIProperties openAIProperties;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping
    public ResponseEntity<Map<String, Object>> recommend(@RequestBody Map<String, Object> body) {
        Long memberId = Long.parseLong(body.getOrDefault("memberId", "0").toString());
        int count     = Integer.parseInt(body.getOrDefault("count", "5").toString());

        // Build reading history context from circulations
        String historyContext = buildHistoryContext(memberId);

        String prompt = String.format(
                "You are a knowledgeable librarian AI. A library member has borrowed the following books:\n\n" +
                "%s\n\n" +
                "Based on this reading history, recommend exactly %d books they would likely enjoy. " +
                "For each recommendation, provide: title, author, and a one-sentence reason why. " +
                "Format each as: [N]. \"Title\" by Author — Reason.",
                historyContext, count
        );

        String apiKey = openAIProperties.getApiKey();
        if (apiKey == null || apiKey.isBlank()) {
            return ResponseEntity.ok(Map.of(
                    "recommendations", fallbackRecommendations(count),
                    "source", "fallback"
            ));
        }

        try {
            String apiUrl = "https://api.openai.com/v1/chat/completions";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new LinkedHashMap<>();
            requestBody.put("model", "gpt-3.5-turbo");
            requestBody.put("max_tokens", 600);
            requestBody.put("messages", List.of(
                    Map.of("role", "system", "content", "You are a librarian that gives book recommendations."),
                    Map.of("role", "user",   "content", prompt)
            ));

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);

            Map responseBody = response.getBody();
            List choices = (List) responseBody.get("choices");
            Map first = (Map) choices.get(0);
            Map message = (Map) first.get("message");
            String content = (String) message.get("content");

            return ResponseEntity.ok(Map.of(
                    "recommendations", content,
                    "source", "openai",
                    "historyItems", historyContext.isEmpty() ? 0
                            : historyContext.split("\n").length
            ));

        } catch (Exception e) {
            return ResponseEntity.ok(Map.of(
                    "recommendations", fallbackRecommendations(count),
                    "source", "fallback",
                    "error", e.getMessage()
            ));
        }
    }

    /** Fetch titles of books the member has borrowed */
    private String buildHistoryContext(Long memberId) {
        if (memberId == null || memberId == 0) return "(no borrowing history available)";
        try {
            Iterable<Circulation> circs = circulationRepository.findAll();
            List<String> titles = new ArrayList<>();
            for (Circulation c : circs) {
                if (c.getMemberName() != null && memberId.equals(c.getMemberName().getId())
                        && c.getCatalogItemName() != null) {
                    titles.add("- \"" + c.getCatalogItemName().getTitle() + "\"");
                }
            }
            if (titles.isEmpty()) return "(no borrowing history)";
            return titles.stream().distinct().limit(20).collect(Collectors.joining("\n"));
        } catch (Exception e) {
            return "(could not load history)";
        }
    }

    private String fallbackRecommendations(int count) {
        List<String> defaults = List.of(
                "1. \"The Great Gatsby\" by F. Scott Fitzgerald — A classic of American literature.",
                "2. \"To Kill a Mockingbird\" by Harper Lee — A timeless story about justice.",
                "3. \"1984\" by George Orwell — Essential dystopian fiction.",
                "4. \"Sapiens\" by Yuval Noah Harari — A brief history of humankind.",
                "5. \"The Name of the Wind\" by Patrick Rothfuss — Acclaimed fantasy novel."
        );
        return defaults.stream().limit(count).collect(Collectors.joining("\n"));
    }
}

package com.dev.delta.controllers;


import com.dev.delta.dto.OpenAIProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Enable CORS for Angular app
public class ChatbotController {

//    @Value("${openai.api.key}")
//    private String openAIKey; // Inject OpenAI API Key from application.properties

    private final OpenAIProperties openAPIProperties;

    @Autowired
    public ChatbotController(OpenAIProperties openAPIProperties) {
        this.openAPIProperties = openAPIProperties;
    }

    // Handle chat messages from the frontend
    @PostMapping
    public ResponseEntity<Map<String, String>> chatWithBot(@RequestBody Map<String, String> userInput) {
        String userMessage = userInput.get("message");

        // Call method to get a response from OpenAI API
        String botReply = getChatGptResponse(userMessage);

        // Prepare and return the response to the frontend
        Map<String, String> response = new HashMap<>();
        response.put("reply", botReply);

        return ResponseEntity.ok(response);
    }

    // Method to call OpenAI API and get the chatbot response
    private String getChatGptResponse(String userMessage) {
        // OpenAI API URL for chat completions
        String apiUrl = "https://api.openai.com/v1/chat/completions";

        // Set up headers for the request
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openAPIProperties.getApiKey());
        headers.set("Content-Type", "application/json");

        // Create request body for the OpenAI API
        String requestBody = "{\n" +
                "    \"model\": \"gpt-3.5-turbo\",\n" +
                "    \"messages\": [\n" +
                "        {\"role\": \"system\", \"content\": \"You are a helpful assistant.\"},\n" +
                "        {\"role\": \"user\", \"content\": \"" + userMessage + "\"}\n" +
                "    ],\n" +
                "    \"max_tokens\": 100,\n" +
                "    \"temperature\": 0.7,\n" +
                "    \"top_p\": 1,\n" +
                "    \"n\": 1,\n" +
                "    \"stream\": false\n" +
                "}";

        // Create an entity with the headers and body
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Use RestTemplate to make the API call
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

        // Process the response and extract the chatbot's reply
        String botReply = extractReplyFromResponse(response.getBody());

        return botReply != null ? botReply : "Sorry, I couldn't understand the message.";
    }

    // Extract the chatbot's reply from the API response
    private String extractReplyFromResponse(String apiResponse) {
        // Simple parsing logic to extract the chatbot reply
        try {
            // Assume the response is in JSON format and contains the bot's message
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(apiResponse);
            return rootNode.path("choices").get(0).path("message").path("content").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

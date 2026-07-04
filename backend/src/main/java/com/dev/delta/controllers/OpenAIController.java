package com.dev.delta.controllers;

import com.dev.delta.dto.OpenAIProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.Properties;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/openai")
public class OpenAIController {

    private final OpenAIProperties openAIProperties;

    @Value("${openai.properties.file}")
    private String propertiesFilePath; // Path to openai.properties file

    @Autowired
    public OpenAIController(OpenAIProperties openAIProperties) {
        this.openAIProperties = openAIProperties;
    }

    // Endpoint to get OpenAI API key
    @GetMapping("/properties")
    public OpenAIProperties getOpenAIProperties() {
        return openAIProperties;
    }

    // Endpoint to update OpenAI API key
    @PostMapping("/properties")
    public String updateOpenAIProperties(@RequestBody OpenAIProperties properties) {
        // Update in memory
        openAIProperties.setApiKey(properties.getApiKey());

        // Save to openai.properties file
        try (OutputStream output = new FileOutputStream(propertiesFilePath)) {
            Properties props = new Properties();
            props.setProperty("openai.api.key", properties.getApiKey());
            props.store(output, null);
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to update properties";
        }

        return "OpenAI API key updated successfully";
    }

    // Load properties from openai.properties on startup
    @PostConstruct
    public void loadProperties() {
        Properties props = new Properties();
        try (InputStream input = new FileInputStream(propertiesFilePath)) {
            props.load(input);
            openAIProperties.setApiKey(props.getProperty("openai.api.key"));
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception
        }
    }
}


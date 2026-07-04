package com.dev.delta.controllers;

import com.dev.delta.dto.TwilioProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;


@RestController
@RequestMapping("/api/twilio")
@CrossOrigin(origins = "*")
public class TwilioController {

    private final TwilioProperties twilioProperties;

    @Value("${twilio.properties.file}")
    private String propertiesFilePath; // Path to twilio.properties file

    @Autowired
    public TwilioController(TwilioProperties twilioProperties) {
        this.twilioProperties = twilioProperties;
    }

    // Endpoint to get Twilio properties
    @GetMapping("/properties")
    public TwilioProperties getTwilioProperties() {
        return twilioProperties;
    }

    // Endpoint to update Twilio properties
    @PostMapping("/properties")
    public String updateTwilioProperties(@RequestBody TwilioProperties properties) {
        // Update in memory
        twilioProperties.setAccountSid(properties.getAccountSid());
        twilioProperties.setAuthToken(properties.getAuthToken());
        twilioProperties.setPhoneNumber(properties.getPhoneNumber());

        // Save to twilio.properties file
        try (OutputStream output = new FileOutputStream(propertiesFilePath)) {
            Properties props = new Properties();
            props.setProperty("twilio.accountSid", properties.getAccountSid());
            props.setProperty("twilio.authToken", properties.getAuthToken());
            props.setProperty("twilio.phoneNumber", properties.getPhoneNumber());
            props.store(output, null);
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to update properties";
        }

        return "Twilio properties updated successfully";
    }

    // Load properties from twilio.properties on startup
    @PostConstruct
    public void loadProperties() {
        Properties props = new Properties();
        try (InputStream input = new FileInputStream(propertiesFilePath)) {
            props.load(input);
            twilioProperties.setAccountSid(props.getProperty("twilio.accountSid"));
            twilioProperties.setAuthToken(props.getProperty("twilio.authToken"));
            twilioProperties.setPhoneNumber(props.getProperty("twilio.phoneNumber"));
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception
        }
    }
}

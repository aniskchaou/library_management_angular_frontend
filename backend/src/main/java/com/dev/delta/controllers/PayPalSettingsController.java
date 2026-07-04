package com.dev.delta.controllers;

import com.dev.delta.dto.PayPalProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.Properties;

@RestController
@RequestMapping("/settings/paypal")
@CrossOrigin(origins = "*")
public class PayPalSettingsController {

    private  PayPalProperties payPalProperties;

    @Value("${paypal.properties.file}")
    private String propertiesFilePath; // Path to paypal.properties file

    @Autowired
    public PayPalSettingsController(PayPalProperties payPalProperties) {
        this.payPalProperties = payPalProperties;
    }

    // Endpoint to get PayPal properties
    @GetMapping("/properties")
    public PayPalProperties getPayPalProperties() {
        return payPalProperties;
    }

    // Endpoint to update PayPal properties
    @PostMapping("/properties")
    public String updatePayPalProperties(@RequestBody PayPalProperties properties) {
        // Update in memory
        payPalProperties.setClientId(properties.getClientId());
        payPalProperties.setClientSecret(properties.getClientSecret());
        payPalProperties.setMode(properties.getMode());

        // Save to paypal.properties file
        try (OutputStream output = new FileOutputStream(propertiesFilePath)) {
            Properties props = new Properties();
            props.setProperty("paypal.clientId", properties.getClientId());
            props.setProperty("paypal.clientSecret", properties.getClientSecret());
            props.setProperty("paypal.mode", properties.getMode());
            props.store(output, null);
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to update properties";
        }

        return "PayPal properties updated successfully";
    }

    // Load properties from paypal.properties on startup
    @PostConstruct
    public void loadProperties() {
        Properties props = new Properties();
        try (InputStream input = new FileInputStream(propertiesFilePath)) {
            props.load(input);
            payPalProperties.setClientId(props.getProperty("paypal.clientId"));
            payPalProperties.setClientSecret(props.getProperty("paypal.clientSecret"));
            payPalProperties.setMode(props.getProperty("paypal.mode"));
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception
        }
    }
}


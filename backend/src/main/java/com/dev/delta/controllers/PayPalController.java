package com.dev.delta.controllers;

import com.dev.delta.dto.PaymentRequest;
import com.dev.delta.services.PaymentEmailService;
import com.dev.delta.services.PayPalService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.paypal.api.payments.Links;

import java.util.Map;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/paypal")
public class PayPalController {

    @Autowired
    private PayPalService payPalService;

    @Autowired
    PaymentEmailService paymentEmailService;

    @PostMapping("/complete")
    public ResponseEntity<?> completePayment(@RequestBody Map<String, Object> paymentDetails) {
        try {
            String paymentId = (String) paymentDetails.get("paymentID");
            String payerId = (String) paymentDetails.get("payerID");
            Payment payment = payPalService.executePayment(paymentId, payerId);
            return new ResponseEntity<>(payment, HttpStatus.OK);
        } catch (PayPalRESTException e) {
            return new ResponseEntity<>("Payment Failed", HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/create-payment")
    public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> paymentInfo) {
        try {
            // Extract amount and ensure it's formatted correctly
            String amountString = (String) paymentInfo.get("amount");
            // Validate that amount is a valid double and properly formatted
            Double total = Double.parseDouble(amountString);

            // Ensure total is a positive value
            if (total <= 0) {
                return new ResponseEntity<>("Amount must be greater than zero", HttpStatus.BAD_REQUEST);
            }

            String currency = (String) paymentInfo.get("currency");
            String description = (String) paymentInfo.get("description");

            // Define URLs
            String cancelUrl = "http://localhost:4200/cancel"; // Replace with your actual cancel URL
            String successUrl = "http://localhost:8080/api/paypal/success"; // Replace with your actual success URL

            // Create payment with PayPal service
            Payment payment = payPalService.createPayment(total, currency, description, cancelUrl, successUrl);

            // Extract approval URL
            String approvalUrl = payment.getLinks().stream()
                    .filter(link -> "approval_url".equals(link.getRel()))
                    .findFirst()
                    .map(Links::getHref)
                    .orElseThrow(() -> new RuntimeException("Approval URL not found"));

            return ResponseEntity.ok(Map.of("paymentLink", approvalUrl));
        } catch (PayPalRESTException e) {
            return new ResponseEntity<>("Error occurred while creating payment: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>("Invalid amount format", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/send-payment-link")
    public String sendPaymentLink(@RequestBody PaymentRequest paymentRequest) {
        // Extract details from the payment request
        String customerName = paymentRequest.getCustomerName();
        double amountDue = paymentRequest.getAmountDue();
        String description = paymentRequest.getDescription();

        // Replace with your actual details or retrieve from properties
        String yourName = "Your Name";
        String yourPosition = "Your Position";
        String yourBusinessName = "Your Business Name";
        String yourContactInfo = "your-contact@example.com";

        // Create a payment link using PayPal API
        String paymentLink;

        // Define URLs
        String cancelUrl = "http://localhost:4200/cancel"; // Replace with your actual cancel URL
        String successUrl = "http://localhost:8080/api/paypal/success"; // Replace with your actual success URL

        try {
            paymentLink = payPalService.createPayPalPayment(amountDue, description);
        } catch (Exception e) {
            return "Error creating payment link: " + e.getMessage();
        }

        // Send the payment link via email
        paymentEmailService.sendEmail(paymentRequest.getEmail(),customerName, paymentLink, amountDue, description,
                yourName, yourPosition, yourBusinessName, yourContactInfo);

        return "Payment link sent successfully! to"+paymentRequest.getEmail();
    }

    // Method to create a payment link with PayPal API





}

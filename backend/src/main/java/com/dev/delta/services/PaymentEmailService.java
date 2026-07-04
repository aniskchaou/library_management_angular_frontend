package com.dev.delta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.InputStream;
import java.util.Properties;
@Service
public class PaymentEmailService {

    // Method to send an email with payment link
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String destination,String customerName, String paymentLink, double amountDue, String description,
                          String yourName, String yourPosition, String yourBusinessName, String yourContactInfo) {

        // Define email properties
        String from = yourContactInfo; // Replace with your "from" email
        String subject = "Payment Request for Your Order";

        // Build the email content
        String body = String.format("Dear %s,\n\n" +
                        "I hope this message finds you well!\n\n" +
                        "Thank you for choosing %s. We appreciate your business and are looking forward to serving you.\n\n" +
                        "To proceed with your order, please find the payment link below:\n\n" +
                        "%s\n\n" +
                        "Amount Due: $%.2f\n" +
                        "Description: %s\n\n" +
                        "Please click on the link to complete your payment securely. If you have any questions or need assistance, feel free to reach out.\n\n" +
                        "Thank you for your prompt attention to this matter!\n\n" +
                        "Best regards,\n\n" +
                        "%s\n" +
                        "%s\n" +
                        "%s\n" +
                        "%s",
                customerName,
                yourBusinessName,
                paymentLink,
                amountDue,
                description,
                yourName,
                yourPosition,
                yourBusinessName,
                yourContactInfo);

        // Create a SimpleMailMessage object
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(destination); // Replace with the customer's email
        message.setSubject(subject);
        message.setText(body);

        // Send the email
        mailSender.send(message);
        System.out.println("Email sent successfully!");
    }
}


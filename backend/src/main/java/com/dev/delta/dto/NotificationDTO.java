package com.dev.delta.dto;

// NotificationDTO.java

import com.dev.delta.entities.Notification;
import com.dev.delta.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationDTO implements DTO {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void populate() {
        createAndSaveNotification("A new book has been added: 'The Great Gatsby'", LocalDateTime.now(), "info");
        createAndSaveNotification("Your book '1984' is due tomorrow.", LocalDateTime.now().minusDays(1), "warning");
        createAndSaveNotification("Membership renewed successfully.", LocalDateTime.now().minusDays(2), "success");
        createAndSaveNotification("Error fetching new books. Please try again later.", LocalDateTime.now().minusDays(3), "error");
        createAndSaveNotification("A new magazine has arrived at the library.", LocalDateTime.now(), "info");
        createAndSaveNotification("The library will be closed on Thanksgiving Day.", LocalDateTime.now().plusDays(30), "warning");
        createAndSaveNotification("Your request for the book 'To Kill a Mockingbird' has been approved.", LocalDateTime.now(), "success");
        createAndSaveNotification("An error occurred while updating your profile.", LocalDateTime.now().minusDays(4), "error");
    }

    private void createAndSaveNotification(String content, LocalDateTime date, String type) {
        Notification notification = new Notification();
        notification.setContent(content);
        notification.setDate(date);
        notification.setType(type);
        notificationRepository.save(notification);
    }
}

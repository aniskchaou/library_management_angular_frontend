package com.dev.delta.dto;


import com.dev.delta.entities.NoticeTemplate;
import com.dev.delta.repositories.NoticeTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeTemplateDTO implements DTO {

    @Autowired
    private NoticeTemplateRepository noticeTemplateRepository;

    @Override
    public void populate() {
        // Create and save notice templates
        createAndSaveNoticeTemplate("Overdue Book Notice",
                "Dear [Name],\n\nThis is a reminder that the book(s) you borrowed from the library are overdue. Please return the book(s) by [Date] to avoid any late fees.\n\nBest regards,\n[Library Name]");

        createAndSaveNoticeTemplate("Library Event Invitation",
                "Dear [Name],\n\nYou are cordially invited to attend the [Event Name] at our library on [Date] at [Location]. We look forward to your presence.\n\nBest regards,\n[Library Name]");

        createAndSaveNoticeTemplate("Membership Renewal Reminder",
                "Dear [Name],\n\nThis is a reminder that your library membership is due for renewal on [Date]. Please visit the library or use our online portal to renew your membership.\n\nThank you,\n[Library Name]");

        createAndSaveNoticeTemplate("Library Closure Announcement",
                "Dear [All],\n\nPlease be informed that the library will remain closed on [Date] in observance of [Holiday Name]. We apologize for any inconvenience this may cause.\n\nBest regards,\n[Library Name]");

        createAndSaveNoticeTemplate("Policy Update",
                "Dear [All],\n\nWe would like to inform you that there has been an update to the library’s [Policy Name] policy, effective from [Date]. Please review the updated policy on our website or contact us for more information.\n\nThank you,\n[Library Name]");

    }

    private void createAndSaveNoticeTemplate(String title, String contentTemplate) {
        NoticeTemplate noticeTemplate = new NoticeTemplate();
        noticeTemplate.setTitle(title);
        noticeTemplate.setContentTemplate(contentTemplate);
        noticeTemplateRepository.save(noticeTemplate);
    }
}

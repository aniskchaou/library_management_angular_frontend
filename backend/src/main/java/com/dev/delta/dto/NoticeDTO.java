package com.dev.delta.dto;

import com.dev.delta.entities.Member;
import com.dev.delta.entities.Notice;
import com.dev.delta.entities.NoticeTemplate;
import com.dev.delta.repositories.MemberRepository;
import com.dev.delta.repositories.NoticeRepository;
import com.dev.delta.repositories.NoticeTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeDTO implements DTO {

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private NoticeTemplateRepository noticeTemplateRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public void populate() {
        // Fetch notice templates and members from repositories
        List<NoticeTemplate> noticeTemplates = noticeTemplateRepository.findAll();
        List<Member> members = memberRepository.findAll();

        // Check if notice templates and members exist
        if (noticeTemplates.isEmpty()) {
            throw new RuntimeException("No notice templates available to create notices.");
        }

        if (members.isEmpty()) {
            throw new RuntimeException("No members available to assign notices.");
        }

        // Create and save notices
        createAndSaveNotice("Email", "member1@example.com", "Meeting Reminder", "Scheduled Maintenance", "High", noticeTemplates.get(0), members.get(0));
        createAndSaveNotice("SMS", "member2@example.com", "Event Invitation", "Event", "Medium", noticeTemplates.get(0), members.get(0));
        createAndSaveNotice("Email", "member3@example.com", "Payment Due", "Payment Reminder", "High", noticeTemplates.get(0), members.get(0));
        createAndSaveNotice("SMS", "member4@example.com", "Holiday Notice", "Holiday Announcement", "Low", noticeTemplates.get(0), members.get(0));
        createAndSaveNotice("Email", "member5@example.com", "Policy Update", "Policy Change", "Medium", noticeTemplates.get(0), members.get(0));
    }

    private void createAndSaveNotice(String notificationMethod, String receiver, String subject, String type, String importance, NoticeTemplate noticeTemplate, Member member) {
        Notice notice = new Notice();
        notice.setNotificationMethod(notificationMethod);
        notice.setReceiver(receiver);
        notice.setSubject(subject);
        notice.setType(type);
        notice.setImportance(importance);
        //notice.setNoticeTemplate(noticeTemplate);
        //notice.setMember(member);
        noticeRepository.save(notice);
    }
}


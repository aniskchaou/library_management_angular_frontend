package com.dev.delta.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String notificationMethod; // Notification methods like SMS, Email, etc.

    @Column(nullable = false)
    private String receiver; // Receiver information (e.g., member identifier)

    @Column(nullable = false)
    private String subject; // Subject of the notice

    @Column(nullable = false)
    private String type; // Type of the notice (e.g., Scheduled Maintenance)

    @Column(nullable = false)
    private String importance; // Importance level (e.g., High, Medium, Low)

   /* @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", nullable = false)
    @JsonIgnore
    private NoticeTemplate noticeTemplate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @JsonIgnore
    private Member member;*/


    // Constructors
    public Notice() {
    }

    public Notice(String notificationMethod, String receiver, String subject, String type, String importance) {
        this.notificationMethod = notificationMethod;
        this.receiver = receiver;
        this.subject = subject;
        this.type = type;
        this.importance = importance;

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNotificationMethod() {
        return notificationMethod;
    }

    public void setNotificationMethod(String notificationMethod) {
        this.notificationMethod = notificationMethod;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImportance() {
        return importance;
    }

    public void setImportance(String importance) {
        this.importance = importance;
    }

   /* public NoticeTemplate getNoticeTemplate() {
        return noticeTemplate;
    }

    public void setNoticeTemplate(NoticeTemplate noticeTemplate) {
        this.noticeTemplate = noticeTemplate;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }*/

    @Override
    public String toString() {
        return "Notice{" +
                "id=" + id +
                ", notificationMethod='" + notificationMethod + '\'' +
                ", receiver='" + receiver + '\'' +
                ", subject='" + subject + '\'' +
                ", type='" + type + '\'' +
                ", importance='" + importance + '\'' +
                '}';
    }
}


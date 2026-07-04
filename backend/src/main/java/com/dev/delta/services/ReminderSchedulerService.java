package com.dev.delta.services;

import com.dev.delta.entities.Circulation;
import com.dev.delta.entities.RequestedBook;
import com.dev.delta.repositories.CirculationRepository;
import com.dev.delta.repositories.RequestedBookRepository;
import com.dev.delta.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Handles scheduled tasks for:
 * - Overdue book reminders (email)
 * - Due-tomorrow reminders (email)
 * - Reservation expiry enforcement
 * - Membership expiry marking
 */
@Service
public class ReminderSchedulerService {

    @Autowired
    private CirculationRepository circulationRepository;

    @Autowired
    private RequestedBookRepository requestedBookRepository;

    @Autowired(required = false)
    private com.dev.delta.repositories.MemberRepository memberRepository;

    @Autowired(required = false)
    private EmailService emailService;

    // ── Templates ──────────────────────────────────────────────────────────────

    private String overdueEmailBody(String memberName, String bookTitle, String dueDate) {
        return "<p>Dear <strong>" + memberName + "</strong>,</p>"
            + "<p>This is an automatic reminder that the following item is <strong>overdue</strong>:</p>"
            + "<blockquote><strong>" + bookTitle + "</strong><br>Due: " + dueDate + "</blockquote>"
            + "<p>Please return it as soon as possible to avoid additional fines.</p>"
            + "<p>Thank you,<br>Library Team</p>";
    }

    private String dueTomorrowEmailBody(String memberName, String bookTitle, String dueDate) {
        return "<p>Dear <strong>" + memberName + "</strong>,</p>"
            + "<p>This is a friendly reminder that the following item is due <strong>tomorrow</strong>:</p>"
            + "<blockquote><strong>" + bookTitle + "</strong><br>Due: " + dueDate + "</blockquote>"
            + "<p>Please return it on time to avoid fines.</p>"
            + "<p>Thank you,<br>Library Team</p>";
    }

    /**
     * Every day at 08:00 — send overdue reminder emails.
     */
    @Scheduled(cron = "0 0 8 * * *")
    public void sendOverdueReminders() {
        LocalDate today = LocalDate.now();
        List<Circulation> overdue = circulationRepository.findOverdueItemsForAll(today);
        if (overdue.isEmpty()) return;

        int sent = 0;
        for (Circulation c : overdue) {
            String email = (c.getMemberName() != null) ? c.getMemberName().getPrimary_email() : null;
            String name  = (c.getMemberName() != null) ? c.getMemberName().getFirstname() : "Member";
            String title = (c.getCatalogItemName() != null) ? c.getCatalogItemName().getTitle() : "Unknown book";
            String due   = c.getToReturn() != null ? c.getToReturn().toString() : "N/A";
            System.out.printf("[REMINDER] Overdue: member=%s, book=%s, due=%s%n", email, title, due);
            if (email != null && !email.isBlank() && emailService != null) {
                if (emailService.sendSimple(email, "Overdue Book Reminder — " + title,
                        overdueEmailBody(name, title, due))) {
                    sent++;
                }
            }
        }
        System.out.printf("[SCHEDULER] sendOverdueReminders: %d overdue, %d emails sent%n", overdue.size(), sent);
    }

    /**
     * Every day at 09:00 — warn members whose book is due tomorrow.
     */
    @Scheduled(cron = "0 0 9 * * *")
    public void sendDueTomorrowReminders() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<Circulation> dueSoon = circulationRepository.findOverdueItemsForTomorrow(tomorrow);
        if (dueSoon.isEmpty()) return;

        int sent = 0;
        for (Circulation c : dueSoon) {
            String email = (c.getMemberName() != null) ? c.getMemberName().getPrimary_email() : null;
            String name  = (c.getMemberName() != null) ? c.getMemberName().getFirstname() : "Member";
            String title = (c.getCatalogItemName() != null) ? c.getCatalogItemName().getTitle() : "Unknown book";
            String due   = c.getToReturn() != null ? c.getToReturn().toString() : "N/A";
            System.out.printf("[REMINDER] Due tomorrow: member=%s, book=%s%n", email, title);
            if (email != null && !email.isBlank() && emailService != null) {
                if (emailService.sendSimple(email, "Book Due Tomorrow — " + title,
                        dueTomorrowEmailBody(name, title, due))) {
                    sent++;
                }
            }
        }
        System.out.printf("[SCHEDULER] sendDueTomorrowReminders: %d due, %d emails sent%n", dueSoon.size(), sent);
    }

    /**
     * Every day at midnight — expire reservations past their expiry date
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void expireReservations() {
        LocalDate today = LocalDate.now();
        List<RequestedBook> all = requestedBookRepository.findAll();
        int expired = 0;
        for (RequestedBook r : all) {
            if (("PENDING".equals(r.getStatus()) || "NOTIFIED".equals(r.getStatus()))
                    && r.getExpiryDate() != null && r.getExpiryDate().isBefore(today)) {
                r.setStatus("EXPIRED");
                requestedBookRepository.save(r);
                expired++;
            }
        }
        if (expired > 0) System.out.printf("[SCHEDULER] Expired %d reservations%n", expired);
    }

    /**
     * Every day at 07:00 — mark members with passed expiry as expired
     */
    @Scheduled(cron = "0 0 7 * * *")
    public void markExpiredMemberships() {
        if (memberRepository == null) return;
        LocalDate today = LocalDate.now();
        memberRepository.findAll().forEach(m -> {
            if (!m.isExpired() && m.getMembershipExpiry() != null && m.getMembershipExpiry().isBefore(today)) {
                m.setExpired(true);
                memberRepository.save(m);
                System.out.printf("[SCHEDULER] Membership expired: memberId=%d%n", m.getId());
            }
        });
    }

    /**
     * Every Monday at 07:00 — generate and "export" weekly summary report.
     * In production: call ReportService.generateWeeklySummary() and email to admins.
     */
    @Scheduled(cron = "0 0 7 * * MON")
    public void weeklyReportExport() {
        LocalDate today = LocalDate.now();
        LocalDate weekAgo = today.minusDays(7);

        long overdueCount = 0;
        try {
            overdueCount = java.util.stream.StreamSupport
                    .stream(circulationRepository.findAll().spliterator(), false)
                    .filter(c -> c.getToReturn() != null
                            && c.getReturnDate() == null)
                    .count();
        } catch (Exception ignored) {}

        System.out.printf(
                "[REPORT] Weekly Export (%s – %s): overdueCount=%d%n",
                weekAgo, today, overdueCount
        );
        // TODO: inject JavaMailSender + generate CSV/PDF and email to configured admins
    }

    /**
     * First day of every month at 06:00 — monthly circulation report.
     */
    @Scheduled(cron = "0 0 6 1 * *")
    public void monthlyReportExport() {
        LocalDate month = LocalDate.now().withDayOfMonth(1);
        System.out.printf("[REPORT] Monthly Export for %s – generating circulation summary…%n", month);
        // TODO: generate and email monthly report
    }
}

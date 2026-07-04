package com.dev.delta.controllers;

import com.dev.delta.entities.Circulation;
import com.dev.delta.entities.Member;
import com.dev.delta.entities.Payment;
import com.dev.delta.repositories.CirculationRepository;
import com.dev.delta.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Generates printable HTML receipts for circulations and payments.
 * Angular can call these endpoints and open in a new browser tab for printing.
 */
@RestController
@RequestMapping("receipt")
@CrossOrigin(origins = "*")
public class ReceiptController {

    @Autowired
    private CirculationRepository circulationRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // ── Circulation / book-issue receipt ─────────────────────────────────────
    @GetMapping(value = "/circulation/{id}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> circulationReceipt(@PathVariable Long id) {
        Optional<Circulation> opt = circulationRepository.findById(id);
        if (!opt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Circulation c = opt.get();
        Member m = c.getMemberName();
        String memberName = m != null ? m.getFirstname() + " " + m.getSurname() : "N/A";
        String memberEmail = m != null ? m.getPrimary_email() : "N/A";
        String bookTitle = c.getCatalogItemName() != null ? c.getCatalogItemName().getTitle() : "N/A";
        String isbn = c.getCatalogItemName() != null ? c.getCatalogItemName().getIsbn() : "N/A";

        String html = "<!DOCTYPE html><html><head><meta charset='UTF-8'>" +
                "<title>Circulation Receipt</title>" +
                "<style>" +
                "body{font-family:Arial,sans-serif;max-width:600px;margin:40px auto;padding:20px;border:1px solid #ccc}" +
                "h2{text-align:center;color:#333} table{width:100%;border-collapse:collapse;margin-top:20px}" +
                "td{padding:8px 12px;border-bottom:1px solid #eee} .label{font-weight:bold;width:45%}" +
                ".footer{margin-top:30px;text-align:center;font-size:0.85em;color:#888}" +
                "@media print{button{display:none}}" +
                "</style></head><body>" +
                "<h2>Library — Book Issue Receipt</h2>" +
                "<table>" +
                "<tr><td class='label'>Receipt ID</td><td>#CIRC-" + c.getId() + "</td></tr>" +
                "<tr><td class='label'>Member</td><td>" + esc(memberName) + "</td></tr>" +
                "<tr><td class='label'>Email</td><td>" + esc(memberEmail) + "</td></tr>" +
                "<tr><td class='label'>Book Title</td><td>" + esc(bookTitle) + "</td></tr>" +
                "<tr><td class='label'>ISBN</td><td>" + esc(isbn) + "</td></tr>" +
                "<tr><td class='label'>Issue Date</td><td>" + esc(c.getIssueDate()) + "</td></tr>" +
                "<tr><td class='label'>Due Date</td><td>" + esc(str(c.getToReturn())) + "</td></tr>" +
                "<tr><td class='label'>Penalty</td><td>" + c.getPenalty() + "</td></tr>" +
                "</table>" +
                "<div class='footer'>Thank you for using the library service.</div>" +
                "<br><button onclick='window.print()'>Print Receipt</button>" +
                "</body></html>";

        return ResponseEntity.ok(html);
    }

    // ── Payment receipt ───────────────────────────────────────────────────────
    @GetMapping(value = "/payment/{id}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> paymentReceipt(@PathVariable Long id) {
        Optional<Payment> opt = paymentRepository.findById(id);
        if (!opt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Payment p = opt.get();
        Member m = p.getMember();
        String memberName = m != null ? m.getFirstname() + " " + m.getSurname() : "N/A";

        String html = "<!DOCTYPE html><html><head><meta charset='UTF-8'>" +
                "<title>Payment Receipt</title>" +
                "<style>" +
                "body{font-family:Arial,sans-serif;max-width:600px;margin:40px auto;padding:20px;border:1px solid #ccc}" +
                "h2{text-align:center;color:#333} table{width:100%;border-collapse:collapse;margin-top:20px}" +
                "td{padding:8px 12px;border-bottom:1px solid #eee} .label{font-weight:bold;width:45%}" +
                ".footer{margin-top:30px;text-align:center;font-size:0.85em;color:#888}" +
                "@media print{button{display:none}}" +
                "</style></head><body>" +
                "<h2>Library — Payment Receipt</h2>" +
                "<table>" +
                "<tr><td class='label'>Receipt ID</td><td>#PAY-" + p.getId() + "</td></tr>" +
                "<tr><td class='label'>Member</td><td>" + esc(memberName) + "</td></tr>" +
                "<tr><td class='label'>Amount Paid</td><td>" + p.getAmountPaid() + "</td></tr>" +
                "<tr><td class='label'>Payment Date</td><td>" + esc(str(p.getPaymentDate())) + "</td></tr>" +
                "<tr><td class='label'>Method</td><td>" + esc(p.getPaymentMethod()) + "</td></tr>" +
                "<tr><td class='label'>Reference</td><td>" + esc(p.getPaymentReference()) + "</td></tr>" +
                "<tr><td class='label'>Status</td><td>" + esc(p.getPaymentStatus()) + "</td></tr>" +
                "</table>" +
                "<div class='footer'>Thank you for settling your fine.</div>" +
                "<br><button onclick='window.print()'>Print Receipt</button>" +
                "</body></html>";

        return ResponseEntity.ok(html);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────
    private String esc(String s) {
        if (s == null) return "N/A";
        return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }

    private String str(Object o) {
        return o == null ? "" : o.toString();
    }
}

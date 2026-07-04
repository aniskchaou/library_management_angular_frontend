package com.dev.delta.controllers;

import com.dev.delta.entities.BankTransferPayment;
import com.dev.delta.repositories.BankTransferPaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST endpoints for manual bank-transfer / cash payments.
 *
 * Member workflow:
 *   POST /bank-transfer/submit      — member submits transfer details
 *   GET  /bank-transfer/member/{id} — member views their submissions
 *
 * Staff workflow:
 *   GET  /bank-transfer/all          — list all submissions (optionally filter by status)
 *   GET  /bank-transfer/pending      — shortcut for status=PENDING
 *   POST /bank-transfer/{id}/confirm — confirm receipt
 *   POST /bank-transfer/{id}/reject  — reject with reason
 *   DELETE /bank-transfer/{id}       — remove record
 */
@RestController
@RequestMapping("bank-transfer")
@CrossOrigin(origins = "*")
public class BankTransferController {

    @Autowired
    private BankTransferPaymentRepository repo;

    // ── Member: submit a payment ─────────────────────────────────────────────

    @PostMapping("/submit")
    public ResponseEntity<BankTransferPayment> submit(@RequestBody BankTransferPayment payment) {
        payment.setStatus("PENDING");
        payment.setSubmittedAt(LocalDateTime.now());
        return new ResponseEntity<>(repo.save(payment), HttpStatus.CREATED);
    }

    @GetMapping("/member/{memberId}")
    public List<BankTransferPayment> byMember(@PathVariable Long memberId) {
        return repo.findByMemberId(memberId);
    }

    // ── Staff: list ───────────────────────────────────────────────────────────

    @GetMapping("/all")
    public List<BankTransferPayment> all(
            @RequestParam(required = false) String status) {
        if (status != null && !status.isBlank()) return repo.findByStatus(status.toUpperCase());
        return repo.findAll();
    }

    @GetMapping("/pending")
    public List<BankTransferPayment> pending() {
        return repo.findByStatus("PENDING");
    }

    @GetMapping("/{id}")
    public ResponseEntity<BankTransferPayment> getOne(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ── Staff: confirm ────────────────────────────────────────────────────────

    @PostMapping("/{id}/confirm")
    public ResponseEntity<BankTransferPayment> confirm(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        Optional<BankTransferPayment> opt = repo.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        BankTransferPayment p = opt.get();
        p.setStatus("CONFIRMED");
        p.setReviewedAt(LocalDateTime.now());
        if (body != null) {
            if (body.get("reviewedBy") != null) p.setReviewedBy(body.get("reviewedBy"));
            if (body.get("reviewNote") != null) p.setReviewNote(body.get("reviewNote"));
        }
        return ResponseEntity.ok(repo.save(p));
    }

    // ── Staff: reject ─────────────────────────────────────────────────────────

    @PostMapping("/{id}/reject")
    public ResponseEntity<BankTransferPayment> reject(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        Optional<BankTransferPayment> opt = repo.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        BankTransferPayment p = opt.get();
        p.setStatus("REJECTED");
        p.setReviewedAt(LocalDateTime.now());
        if (body != null) {
            if (body.get("reviewedBy") != null) p.setReviewedBy(body.get("reviewedBy"));
            if (body.get("reviewNote") != null) p.setReviewNote(body.get("reviewNote"));
        }
        return ResponseEntity.ok(repo.save(p));
    }

    // ── Staff: delete ─────────────────────────────────────────────────────────

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ── Bank account info (configured in settings) ────────────────────────────

    @GetMapping("/account-info")
    public ResponseEntity<Map<String, String>> accountInfo() {
        // In a real deployment these values come from GlobalSettings.
        // Return a placeholder so the frontend can display instructions.
        return ResponseEntity.ok(Map.of(
            "bankName",      "Configure in Settings → Payment",
            "accountNumber", "Configure in Settings → Payment",
            "accountHolder", "Library Name",
            "routingNumber", "",
            "swiftCode",     "",
            "note",          "Please use your Member ID as the payment reference."
        ));
    }
}

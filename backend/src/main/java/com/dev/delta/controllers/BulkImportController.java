package com.dev.delta.controllers;

import com.dev.delta.entities.CatalogItem;
import com.dev.delta.entities.Member;
import com.dev.delta.repositories.BookRepository;
import com.dev.delta.repositories.MemberRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Bulk import endpoints for books and members via CSV upload.
 *
 * Book CSV columns (header row required):
 *   title,isbn,author,category,publisher,language,pages,copies,purchasePrice,supplierName
 *
 * Member CSV columns (header row required):
 *   firstname,surname,email,phone,city,country,status,userType
 */
@RestController
@RequestMapping("bulk")
@CrossOrigin(origins = "*")
public class BulkImportController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private MemberRepository memberRepository;

    // ── Import books from CSV ─────────────────────────────────────────────────
    @PostMapping("/books/import/csv")
    public ResponseEntity<?> importBooks(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
        }
        List<String> errors = new ArrayList<>();
        int imported = 0;
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] header = reader.readNext(); // skip header
            if (header == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "CSV has no rows"));
            }
            String[] row;
            int line = 1;
            while ((row = reader.readNext()) != null) {
                line++;
                try {
                    CatalogItem book = new CatalogItem();
                    book.setTitle(get(row, 0));
                    book.setIsbn(get(row, 1));
                    // author/category/publisher left null for simplicity — extend as needed
                    book.setEdition(get(row, 3));
                    String pages = get(row, 4);
                    if (pages != null && !pages.isBlank()) book.setNumber_of_pages(pages);
                    // row[5] = copies (no direct field — stored in notes for now)
                    String copies = get(row, 5);
                    if (copies != null && !copies.isBlank()) book.setNotes("copies=" + copies);
                    String price = get(row, 6);
                    if (price != null && !price.isBlank()) book.setPurchasePrice(new java.math.BigDecimal(price));
                    book.setSupplierName(get(row, 7));
                    bookRepository.save(book);
                    imported++;
                } catch (Exception e) {
                    errors.add("Line " + line + ": " + e.getMessage());
                }
            }
        } catch (IOException | CsvValidationException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
        return ResponseEntity.ok(Map.of("imported", imported, "errors", errors));
    }

    // ── Import members from CSV ───────────────────────────────────────────────
    @PostMapping("/members/import/csv")
    public ResponseEntity<?> importMembers(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
        }
        List<String> errors = new ArrayList<>();
        int imported = 0;
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] header = reader.readNext(); // skip header
            if (header == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "CSV has no rows"));
            }
            String[] row;
            int line = 1;
            while ((row = reader.readNext()) != null) {
                line++;
                try {
                    Member m = new Member();
                    m.setFirstname(get(row, 0));
                    m.setSurname(get(row, 1));
                    m.setPrimary_email(get(row, 2));
                    m.setPrimary_phone(get(row, 3));
                    m.setCity(get(row, 4));
                    m.setCountry(get(row, 5));
                    m.setStatus(get(row, 6) != null ? get(row, 6) : "Active");
                    m.setUserType(get(row, 7));
                    memberRepository.save(m);
                    imported++;
                } catch (Exception e) {
                    errors.add("Line " + line + ": " + e.getMessage());
                }
            }
        } catch (IOException | CsvValidationException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
        return ResponseEntity.ok(Map.of("imported", imported, "errors", errors));
    }

    // ── CSV template downloads ────────────────────────────────────────────────
    @GetMapping("/books/template/csv")
    public org.springframework.http.ResponseEntity<byte[]> bookTemplate() {
        String csv = "title,isbn,edition,pages,copies,purchasePrice,supplierName\n";
        return org.springframework.http.ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=book-import-template.csv")
                .header("Content-Type", "text/csv")
                .body(csv.getBytes());
    }

    @GetMapping("/members/template/csv")
    public org.springframework.http.ResponseEntity<byte[]> memberTemplate() {
        String csv = "firstname,surname,email,phone,city,country,status,userType\n";
        return org.springframework.http.ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=member-import-template.csv")
                .header("Content-Type", "text/csv")
                .body(csv.getBytes());
    }

    // ── Helper ────────────────────────────────────────────────────────────────
    private String get(String[] row, int i) {
        if (row == null || i >= row.length) return null;
        String v = row[i];
        return (v == null || v.isBlank()) ? null : v.trim();
    }
}

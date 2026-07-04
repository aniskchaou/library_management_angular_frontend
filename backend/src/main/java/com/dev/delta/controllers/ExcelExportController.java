package com.dev.delta.controllers;

import com.dev.delta.entities.CatalogItem;
import com.dev.delta.entities.Member;
import com.dev.delta.repositories.BookRepository;
import com.dev.delta.repositories.MemberRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Exports library data as Excel (.xlsx) files using Apache POI.
 * Endpoints: /excel/**
 */
@RestController
@RequestMapping("excel")
@CrossOrigin(origins = "*")
public class ExcelExportController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired(required = false)
    private MemberRepository memberRepository;

    // ── Books ─────────────────────────────────────────────────────────────────

    @GetMapping("/books/export")
    public void exportBooks(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=\"books.xlsx\"");

        try (Workbook wb = new XSSFWorkbook()) {
            Sheet sheet = wb.createSheet("Books");

            // Header row
            CellStyle headerStyle = boldStyle(wb);
            String[] headers = {"ID", "Title", "ISBN", "Author", "Category", "Publisher",
                    "Edition", "Pages", "Language", "Available Copies", "Price"};
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data rows
            int rowIdx = 1;
            List<CatalogItem> books = (List<CatalogItem>) bookRepository.findAll();
            for (CatalogItem b : books) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(safe(b.getId()));
                row.createCell(1).setCellValue(safe(b.getTitle()));
                row.createCell(2).setCellValue(safe(b.getIsbn()));
                row.createCell(3).setCellValue(b.getWriter() != null ? b.getWriter().getName() : "");
                row.createCell(4).setCellValue(b.getCategory() != null ? b.getCategory().getCategory_name() : "");
                row.createCell(5).setCellValue(b.getPublisher() != null ? b.getPublisher().getName() : "");
                row.createCell(6).setCellValue(safe(b.getEdition()));
                row.createCell(7).setCellValue(safe(b.getNumber_of_pages()));
                row.createCell(8).setCellValue(safe(b.getEdition())); // language field
                row.createCell(9).setCellValue("");
                row.createCell(10).setCellValue(
                        b.getPurchasePrice() != null ? b.getPurchasePrice().toPlainString() : "");
            }

            autoSize(sheet, headers.length);
            wb.write(response.getOutputStream());
        }
    }

    // ── Members ───────────────────────────────────────────────────────────────

    @GetMapping("/members/export")
    public void exportMembers(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=\"members.xlsx\"");

        try (Workbook wb = new XSSFWorkbook()) {
            Sheet sheet = wb.createSheet("Members");

            CellStyle headerStyle = boldStyle(wb);
            String[] headers = {"ID", "First Name", "Last Name", "Email", "Phone",
                    "Type", "Status", "Membership Expiry", "Created Date"};
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            if (memberRepository != null) {
                int rowIdx = 1;
                for (Member m : memberRepository.findAll()) {
                    Row row = sheet.createRow(rowIdx++);
                    row.createCell(0).setCellValue(safe(m.getId()));
                    row.createCell(1).setCellValue(safe(m.getFirstname()));
                    row.createCell(2).setCellValue(safe(m.getSurname()));
                    row.createCell(3).setCellValue(safe(m.getPrimary_email()));
                    row.createCell(4).setCellValue(safe(m.getPrimary_phone()));
                    row.createCell(5).setCellValue(safe(m.getUserType()));
                    row.createCell(6).setCellValue(safe(m.getStatus()));
                    row.createCell(7).setCellValue(safe(m.getMembershipExpiry()));
                    row.createCell(8).setCellValue(safe(m.getCreatedDate()));
                }
            }

            autoSize(sheet, headers.length);
            wb.write(response.getOutputStream());
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private CellStyle boldStyle(Workbook wb) {
        CellStyle style = wb.createCellStyle();
        Font font = wb.createFont();
        font.setBold(true);
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    private void autoSize(Sheet sheet, int columns) {
        for (int i = 0; i < columns; i++) sheet.autoSizeColumn(i);
    }

    private String safe(Object o) {
        return o == null ? "" : o.toString();
    }
}

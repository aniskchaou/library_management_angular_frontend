package com.dev.delta.controllers;

import com.dev.delta.entities.Invoice;
import com.dev.delta.services.InvoiceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("invoice")
@CrossOrigin(origins = "*")
@Api(value = "InvoiceController", description = "Controller for Invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @ApiOperation(value = "Add Invoice")
    @PostMapping("/create")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Bad Request")
    })
    public ResponseEntity<?> addInvoice( @RequestBody Invoice invoice, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Invoice newInvoice = invoiceService.save(invoice);
        return new ResponseEntity<>(newInvoice, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Invoices")
    @GetMapping("/all")
    public Iterable<Invoice> getAllInvoices() {
        return invoiceService.findAll();
    }

    @ApiOperation(value = "Get Invoice by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        Optional<Invoice> invoice = invoiceService.findById(id);
        return invoice.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @ApiOperation(value = "Delete Invoice by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteInvoice(@PathVariable Long id) {
        if (!invoiceService.findById(id).isPresent()) {
            return new ResponseEntity<>("Invoice not found", HttpStatus.NOT_FOUND);
        }
        invoiceService.deleteById(id);
        return new ResponseEntity<>("Invoice was deleted", HttpStatus.OK);
    }
}

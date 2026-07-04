package com.dev.delta.services;

import com.dev.delta.entities.Invoice;
import com.dev.delta.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    /**
     * Retrieve all invoices from the repository.
     *
     * @return a list of all invoices
     */
    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    /**
     * Retrieve an invoice by its ID.
     *
     * @param id the ID of the invoice
     * @return an Optional containing the invoice if found, otherwise empty
     */
    public Optional<Invoice> findById(Long id) {
        return invoiceRepository.findById(id);
    }

    /**
     * Save a new or existing invoice to the repository.
     *
     * @param invoice the invoice to save
     * @return the saved invoice
     */
    public Invoice save(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    /**
     * Delete an invoice by its ID.
     *
     * @param id the ID of the invoice to delete
     */
    public void deleteById(Long id) {
        invoiceRepository.deleteById(id);
    }

    // Additional methods specific to Invoice management can be added here
}


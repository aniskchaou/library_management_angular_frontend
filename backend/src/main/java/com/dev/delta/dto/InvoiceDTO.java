package com.dev.delta.dto;

import com.dev.delta.entities.Invoice;
import com.dev.delta.entities.Order;
import com.dev.delta.entities.Vendor;
import com.dev.delta.repositories.InvoiceRepository;
import com.dev.delta.repositories.OrderRepository;
import com.dev.delta.repositories.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class InvoiceDTO implements DTO {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private OrderRepository orderRepository;

    private static final String[] NOTES = {
            "First invoice for the month.",
            "Payment due in 30 days.",
            "Reminder for overdue payment.",
            "Invoice includes additional charges.",
            "Discount applied for early payment."
    };

    @Override
    public void populate() {
        List<Vendor> vendors = vendorRepository.findAll();
        List<Order> orders = orderRepository.findAll();



        for (int i = 1; i <= 15; i++) {
            Invoice invoice = new Invoice();
            invoice.setInvoiceNumber("INV" + String.format("%04d", i));
            invoice.setInvoiceDate(LocalDate.now().minusDays(new Random().nextInt(30))); // Random date within the last 30 days
            invoice.setVendor(randomVendor(vendors));
            invoice.setTotalAmount(generateRandomTotalAmount());
            invoice.setNotes(randomElement(NOTES));
            //invoice.setOrders(generateOrdersForInvoice(invoice));

            invoiceRepository.save(invoice);
        }
    }

    private Vendor randomVendor(List<Vendor> vendors) {
        Random random = new Random();
        return vendors.get(random.nextInt(vendors.size()));
    }

    private Double generateRandomTotalAmount() {
        Random random = new Random();
        return 100.0 + (5000.0 - 100.0) * random.nextDouble(); // Random amount between 100 and 5000
    }

    private List<Order> generateOrdersForInvoice(Invoice invoice) {
        List<Order> invoiceOrders = new ArrayList<>();
        Random random = new Random();
        int numberOfOrders = random.nextInt(5) + 1; // Random number of orders between 1 and 5
        for (int i = 0; i < numberOfOrders; i++) {
            Order order = randomOrder();
           // order.setInvoice(invoice);
            invoiceOrders.add(order);
        }
        return invoiceOrders;
    }

    private Order randomOrder() {
        List<Order> orders = orderRepository.findAll();
        Random random = new Random();
        return orders.get(0);
    }

    private String randomElement(String[] array) {
        Random random = new Random();
        return array[random.nextInt(array.length)];
    }
}

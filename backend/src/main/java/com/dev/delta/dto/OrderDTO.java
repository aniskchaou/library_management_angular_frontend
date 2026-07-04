package com.dev.delta.dto;

import com.dev.delta.entities.Contract;
import com.dev.delta.entities.Invoice;
import com.dev.delta.entities.Order;
import com.dev.delta.entities.OrderItem;
import com.dev.delta.entities.Vendor;
import com.dev.delta.repositories.ContractRepository;
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
public class OrderDTO implements DTO {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    private static final String[] STATUSES = {"Pending", "Shipped", "Delivered", "Cancelled"};

    @Override
    public void populate() {
        List<Vendor> vendors = vendorRepository.findAll();
        List<Contract> contracts = contractRepository.findAll();
        List<Invoice> invoices = invoiceRepository.findAll();


        for (int i = 1; i <= 15; i++) {
            Order order = new Order();
            order.setOrderNumber("ORD" + String.format("%04d", i));
            order.setOrderDate(LocalDate.now().minusDays(new Random().nextInt(30))); // Random date within the last 30 days
            order.setVendor(randomVendor(vendors));
            //order.setContract(randomContract(contracts));
           // order.setInvoice(randomInvoice(invoices));
            order.setTotalCost(generateRandomTotalCost());
            order.setStatus(randomElement(STATUSES));
            order.setNotes("Sample notes for order " + i);
            order.setItems(generateOrderItemsForOrder(order));

            orderRepository.save(order);
        }
    }

    private Vendor randomVendor(List<Vendor> vendors) {
        Random random = new Random();
        return vendors.get(0);
    }

    private Contract randomContract(List<Contract> contracts) {
        Random random = new Random();
        return contracts.get(0);
    }

    private Invoice randomInvoice(List<Invoice> invoices) {
        Random random = new Random();
        return null;
    }

    private Double generateRandomTotalCost() {
        Random random = new Random();
        return 100.0 + (500.0 - 100.0) * random.nextDouble(); // Random cost between 100 and 500
    }

    private List<OrderItem> generateOrderItemsForOrder(Order order) {
        List<OrderItem> items = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            OrderItem item = new OrderItem();
            item.setItemName("ITEM" + String.format("%04d", i));
            //item.setDescription("Description for item " + i);
            item.setQuantity(new Random().nextInt(10) + 1); // Random quantity between 1 and 10
            item.setPrice(generateRandomTotalCost() / 3); // Divide total cost by number of items
            item.setOrder(order);
            item.setTotal(666d);
            items.add(item);
        }
        return items;
    }

    private String randomElement(String[] array) {
        Random random = new Random();
        return array[random.nextInt(array.length)];
    }
}

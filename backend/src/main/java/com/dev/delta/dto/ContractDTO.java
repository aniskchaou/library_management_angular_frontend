package com.dev.delta.dto;

import com.dev.delta.entities.Contract;
import com.dev.delta.entities.Order;
import com.dev.delta.entities.Vendor;
import com.dev.delta.repositories.ContractRepository;
import com.dev.delta.repositories.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class ContractDTO implements DTO {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private VendorRepository vendorRepository;

    private static final String[] TERMS = {
            "Standard terms and conditions apply.",
            "No returns accepted after 30 days.",
            "Late fees will be applied for overdue payments.",
            "Warranty period of 1 year from the date of purchase.",
            "All goods are subject to inspection upon delivery."
    };

    @Override
    public void populate() {
        List<Vendor> vendors = vendorRepository.findAll();
        if (vendors.isEmpty()) {
            throw new RuntimeException("No vendors available to assign contracts.");
        }

        for (int i = 1; i <= 15; i++) {
            Contract contract = new Contract();
            contract.setContractNumber("CONTR" + String.format("%04d", i));
            contract.setStartDate(LocalDate.now().minusMonths(6)); // Contracts start 6 months ago
            contract.setEndDate(LocalDate.now().plusYears(1)); // Contracts end in 1 year
            contract.setVendor(randomVendor(vendors));
            contract.setTerms(randomElement(TERMS));
            //contract.setOrders(null);

            contractRepository.save(contract);
        }
    }

    private Vendor randomVendor(List<Vendor> vendors) {
        Random random = new Random();
        return vendors.get(random.nextInt(vendors.size()));
    }

    private List<Order> generateOrdersForContract(Contract contract) {
        // Generating sample orders for the contract
        List<Order> orders = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            Order order = new Order();
            order.setOrderNumber("ORD" + String.format("%04d", i));
            //order.setContract(contract);
            // Set other attributes of Order as necessary
            orders.add(order);
        }
        return orders;
    }

    private String randomElement(String[] array) {
        Random random = new Random();
        return array[random.nextInt(array.length)];
    }
}


package com.dev.delta.dto;


import com.dev.delta.entities.Vendor;
import com.dev.delta.repositories.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class VendorDTO implements DTO {

    @Autowired
    VendorRepository vendorRepository;

    @Override
    public void populate() {
        createAndSaveVendor("Vendor 1", "123 Main St", "555-1234", "555-5678", "www.vendor1.com",
                "ACC001", "Manager", "555-9876", "555-4321", "vendor1@example.com", "Good supplier.",
                Arrays.asList(100.0, 200.0, 150.0), true, false, 10.0, 5.0, "2 weeks", "None");

        createAndSaveVendor("Vendor 2", "456 Oak St", "555-2345", "555-6789", "www.vendor2.com",
                "ACC002", "Director", "555-8765", "555-5432", "vendor2@example.com", "Reliable.",
                Arrays.asList(110.0, 210.0, 160.0), true, true, 15.0, 10.0, "1 week", "Rush orders available.");

        createAndSaveVendor("Vendor 3", "789 Pine St", "555-3456", null, null,
                "ACC003", "Sales Rep", null, null, "vendor3@example.com", "High quality products.",
                Arrays.asList(120.0, 220.0, 170.0), false, false, 12.0, 8.0, "3 weeks", "Discounts for bulk orders.");

        createAndSaveVendor("Vendor 4", "101 Maple St", "555-4567", "555-7890", "www.vendor4.com",
                "ACC004", "Coordinator", "555-7654", "555-6543", "vendor4@example.com", "Fast shipping.",
                Arrays.asList(130.0, 230.0, 180.0), true, true, 20.0, 15.0, "2 days", "24/7 customer support.");

        createAndSaveVendor("Vendor 5", "202 Birch St", "555-5678", null, "www.vendor5.com",
                "ACC005", "Owner", null, null, "vendor5@example.com", "Family-owned business.",
                Arrays.asList(140.0, 240.0, 190.0), true, false, 18.0, 12.0, "1 month", "Eco-friendly products.");
    }

    private void createAndSaveVendor(String name, String address, String phone, String fax, String website,
                                     String accountNumber, String position, String alternativePhone, String alternativeFax,
                                     String email, String notes, List<Double> invoicePrices, Boolean taxNumberRegistered,
                                     Boolean invoicePricesIncludeTax, Double taxRate, Double discount, String deliveryTime,
                                     String additionalNotes) {
        Vendor vendor = new Vendor();
        vendor.setName(name);
        vendor.setAddress(address);
        vendor.setPhone(phone);
        vendor.setFax(fax);
        vendor.setWebsite(website);
        vendor.setAccountNumber(accountNumber);
        vendor.setPosition(position);
        vendor.setAlternativePhone(alternativePhone);
        vendor.setAlternativeFax(alternativeFax);
        vendor.setEmail(email);
        vendor.setNotes(notes);
        vendor.setInvoicePrices(null);
        vendor.setTaxNumberRegistered(taxNumberRegistered);
        vendor.setInvoicePricesIncludeTax(invoicePricesIncludeTax);
        vendor.setTaxRate(taxRate);
        vendor.setDiscount(discount);
        vendor.setDeliveryTime(deliveryTime);
        vendor.setAdditionalNotes(additionalNotes);
        vendorRepository.save(vendor);
    }
}

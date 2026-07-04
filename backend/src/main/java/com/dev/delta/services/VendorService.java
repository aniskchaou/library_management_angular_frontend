package com.dev.delta.services;

import com.dev.delta.entities.Vendor;
import com.dev.delta.repositories.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    public List<Vendor> findAll() {
        return vendorRepository.findAll();
    }

    public Optional<Vendor> findById(Long id) {
        return vendorRepository.findById(id);
    }

    public Vendor save(Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    public void deleteById(Long id) {
        vendorRepository.deleteById(id);
    }
}


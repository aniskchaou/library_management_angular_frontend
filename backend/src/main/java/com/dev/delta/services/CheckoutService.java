package com.dev.delta.services;

import com.dev.delta.entities.Checkout;
import com.dev.delta.repositories.CheckoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    public List<Checkout> findAll() {
        return checkoutRepository.findAll();
    }

    public Optional<Checkout> findById(Long id) {
        return checkoutRepository.findById(id);
    }

    public Checkout save(Checkout checkout) {
        return checkoutRepository.save(checkout);
    }

    public void deleteById(Long id) {
        checkoutRepository.deleteById(id);
    }
}


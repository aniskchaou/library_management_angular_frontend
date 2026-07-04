package com.dev.delta.services;

import com.dev.delta.entities.Basket;
import com.dev.delta.repositories.BasketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BasketService {

    @Autowired
    private BasketRepository basketRepository;

    /**
     * Retrieve all baskets from the repository.
     *
     * @return a list of all baskets
     */
    public List<Basket> findAll() {
        return basketRepository.findAll();
    }

    /**
     * Retrieve a basket by its ID.
     *
     * @param id the ID of the basket
     * @return an Optional containing the basket if found, otherwise empty
     */
    public Optional<Basket> findById(Long id) {
        return basketRepository.findById(id);
    }

    /**
     * Save a new or existing basket to the repository.
     *
     * @param basket the basket to save
     * @return the saved basket
     */
    public Basket save(Basket basket) {
        return basketRepository.save(basket);
    }

    /**
     * Delete a basket by its ID.
     *
     * @param id the ID of the basket to delete
     */
    public void deleteById(Long id) {
        basketRepository.deleteById(id);
    }

    // Additional methods specific to Basket management can be added here
}


package com.dev.delta.services;

import com.dev.delta.entities.PurchaseSuggestion;
import com.dev.delta.repositories.PurchaseSuggestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PurchaseSuggestionService {

    @Autowired
    private PurchaseSuggestionRepository purchaseSuggestionRepository;

    /**
     * Retrieve all purchase suggestions.
     *
     * @return List of all purchase suggestions.
     */
    public List<PurchaseSuggestion> findAll() {
        return purchaseSuggestionRepository.findAll();
    }

    /**
     * Retrieve a purchase suggestion by its ID.
     *
     * @param id The ID of the purchase suggestion.
     * @return An Optional containing the purchase suggestion if found, otherwise empty.
     */
    public Optional<PurchaseSuggestion> findById(Long id) {
        return purchaseSuggestionRepository.findById(id);
    }

    /**
     * Save a purchase suggestion to the repository.
     *
     * @param purchaseSuggestion The purchase suggestion to save.
     * @return The saved purchase suggestion.
     */
    public PurchaseSuggestion save(PurchaseSuggestion purchaseSuggestion) {
        return purchaseSuggestionRepository.save(purchaseSuggestion);
    }

    /**
     * Delete a purchase suggestion by its ID.
     *
     * @param id The ID of the purchase suggestion to delete.
     */
    public void deleteById(Long id) {
        purchaseSuggestionRepository.deleteById(id);
    }

    public PurchaseSuggestion updateStatus(Long id, String newStatus) {
        PurchaseSuggestion suggestion = purchaseSuggestionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PurchaseSuggestion not found with id: " + id));
        suggestion.setStatus(newStatus);
        return purchaseSuggestionRepository.save(suggestion);
    }
}

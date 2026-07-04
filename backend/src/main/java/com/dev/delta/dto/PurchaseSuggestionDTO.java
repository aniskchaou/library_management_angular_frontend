package com.dev.delta.dto;

import com.dev.delta.entities.Fund;
import com.dev.delta.entities.MediaType;
import com.dev.delta.entities.Publisher;
import com.dev.delta.entities.PurchaseSuggestion;
import com.dev.delta.entities.Writer;
import com.dev.delta.repositories.FundRepository;
import com.dev.delta.repositories.MediaTypeRepository;
import com.dev.delta.repositories.PublisherRepository;
import com.dev.delta.repositories.PurchaseSuggestionRepository;
import com.dev.delta.repositories.WriterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PurchaseSuggestionDTO implements DTO {

    @Autowired
    private PurchaseSuggestionRepository purchaseSuggestionRepository;

    @Autowired
    private WriterRepository writerRepository;

    @Autowired
    private PublisherRepository publisherRepository;

    @Autowired
    private MediaTypeRepository mediaTypeRepository;

    @Autowired
    private FundRepository fundRepository;

    @Override
    public void populate() {
        // Fetch required data from repositories
        List<Writer> writers = writerRepository.findAll();
        List<Publisher> publishers = publisherRepository.findAll();
        List<MediaType> mediaTypes = mediaTypeRepository.findAll();
        List<Fund> funds = fundRepository.findAll();

        // Check if required data exists


        // Create and save purchase suggestions
        createAndSavePurchaseSuggestion("Title 1", writers.get(0), LocalDate.now().minusYears(1), "ISBN123456", publishers.get(0),
                "Place 1", "Collection 1", mediaTypes.get(0), "Reason 1", "Notes 1", funds.get(0), true, 10, "USD", 20.0, 200.0);

        createAndSavePurchaseSuggestion("Title 2", writers.get(0), LocalDate.now().minusYears(2), "ISBN654321", publishers.get(0),
                "Place 2", "Collection 2", mediaTypes.get(1), "Reason 2", "Notes 2", funds.get(1), false, 5, "EUR", 30.0, 150.0);

        // Add more suggestions as needed
    }

    private void createAndSavePurchaseSuggestion(String title, Writer author, LocalDate copyrightDate,
                                                 String isbnIssnOtherStandardNumber, Publisher publisher, String publicationPlace,
                                                 String collectionTitle, MediaType mediaType, String reasonForSuggestion,
                                                 String notes, Fund fund, Boolean showInactive, Integer copies,
                                                 String currency, Double price, Double total) {
        PurchaseSuggestion suggestion = new PurchaseSuggestion();
        suggestion.setTitle(title);
        suggestion.setAuthor(author);
        suggestion.setCopyrightDate(copyrightDate);
        suggestion.setIsbnIssnOtherStandardNumber(isbnIssnOtherStandardNumber);
        suggestion.setPublisher(publisher);
        suggestion.setPublicationPlace(publicationPlace);
        suggestion.setCollectionTitle(collectionTitle);
        suggestion.setMediaType(mediaType);
        suggestion.setReasonForSuggestion(reasonForSuggestion);
        suggestion.setNotes(notes);
        suggestion.setFund(fund);
        suggestion.setShowInactive(showInactive);
        suggestion.setCopies(copies);
        suggestion.setCurrency(currency);
        suggestion.setPrice(price);
        suggestion.setTotal(total);
        purchaseSuggestionRepository.save(suggestion);
    }
}

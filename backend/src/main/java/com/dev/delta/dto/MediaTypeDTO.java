package com.dev.delta.dto;

import com.dev.delta.entities.MediaType;
import com.dev.delta.repositories.MediaTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaTypeDTO implements DTO {

    @Autowired
    private MediaTypeRepository mediaTypeRepository;

    @Override
    public void populate() {
        // Create and save media types
        createAndSaveMediaType("https://example.com/image1.jpg", "Book", "BOOK", "GEN", "Books", false, 1.50, 0.50, 0.10, 10.00, 2.00, "Thank you for returning the book.", "No limitations");
        createAndSaveMediaType("https://example.com/image2.jpg", "DVD", "DVD", "MOV", "Movies", true, 3.00, 1.00, 0.25, 20.00, 3.00, "Please return the DVD in its original case.", "Limited to 2 DVDs per person.");
        createAndSaveMediaType("https://example.com/image3.jpg", "CD", "CD", "MUS", "Music", false, 2.00, 0.75, 0.15, 15.00, 2.50, "Handle with care.", "No limitations");
        createAndSaveMediaType("https://example.com/image4.jpg", "Magazine", "MAG", "GEN", "Magazines", false, 1.00, 0.30, 0.05, 8.00, 1.50, "Please keep magazines in good condition.", "Limited to 5 magazines per person.");
        createAndSaveMediaType("https://example.com/image5.jpg", "E-Book", "EBOOK", "DIG", "Digital Books", false, 0.00, 0.00, 0.00, 0.00, 0.00, "No physical return needed.", "No limitations");
    }

    private void createAndSaveMediaType(String imageUrl, String name, String code, String parentCode,
                                        String searchCategory, boolean notForLoan, double rentalCharge,
                                        double dailyRentalCharge, double hourlyRentalCharge,
                                        double defaultReplacementCost, double processingFee,
                                        String checkinMessage, String libraryLimitations) {
        MediaType mediaType = new MediaType();
        mediaType.setImageUrl(imageUrl);
        mediaType.setName(name);
        mediaType.setCode(code);
        mediaType.setParentCode(parentCode);
        mediaType.setSearchCategory(searchCategory);
        mediaType.setNotForLoan(notForLoan);
        mediaType.setRentalCharge(rentalCharge);
        mediaType.setDailyRentalCharge(dailyRentalCharge);
        mediaType.setHourlyRentalCharge(hourlyRentalCharge);
        mediaType.setDefaultReplacementCost(defaultReplacementCost);
        mediaType.setProcessingFee(processingFee);
        mediaType.setCheckinMessage(checkinMessage);
        mediaType.setLibraryLimitations(libraryLimitations);
        mediaTypeRepository.save(mediaType);
    }
}

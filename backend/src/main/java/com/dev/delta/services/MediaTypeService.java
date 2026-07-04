package com.dev.delta.services;


import com.dev.delta.dto.ChartData;
import com.dev.delta.entities.CatalogItem;
import com.dev.delta.entities.MediaType;
import com.dev.delta.repositories.BookRepository;
import com.dev.delta.repositories.MediaTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * MediaType Service
 *
 * This service class provides methods to handle CRUD operations and business logic
 * related to MediaType entities.
 */
@Service
public class MediaTypeService {

    @Autowired
    private MediaTypeRepository mediaTypeRepository;

    /**
     * Save or update a MediaType entity.
     *
     * @param mediaType the MediaType entity to save or update
     * @return the saved MediaType entity
     */
    public MediaType saveOrUpdate(MediaType mediaType) {
        return mediaTypeRepository.save(mediaType);
    }

    /**
     * Find all MediaType entities.
     *
     * @return an iterable of all MediaType entities
     */
    public Iterable<MediaType> findAll() {
        return mediaTypeRepository.findAll();
    }

    /**
     * Find a MediaType entity by its ID.
     *
     * @param id the ID of the MediaType entity
     * @return an Optional containing the MediaType entity if found
     */
    public Optional<MediaType> findById(Long id) {
        return mediaTypeRepository.findById(id);
    }

    /**
     * Delete a MediaType entity by its ID.
     *
     * @param id the ID of the MediaType entity to delete
     */
    public void delete(Long id) {
        mediaTypeRepository.deleteById(id);
    }

    @Autowired
    private BookRepository catalogItemRepository;

    //@Autowired
    //private MediaTypeRepository mediaTypeRepository;

    // 1. Number of Media Items by Type
    public List<ChartData> getMediaItemsByType() {
        return mediaTypeRepository.findAll()
                .stream()
                .map(mediaType -> new ChartData(mediaType.getName(),
                        (long) catalogItemRepository.countByMediaType(mediaType)))
                .collect(Collectors.toList());
    }

    // 2. Media Distribution by Genre
    public List<ChartData> getMediaDistributionByGenre() {
        return catalogItemRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(item -> item.getCategory().getCategory_name(), Collectors.counting()))
                .entrySet()
                .stream()
                .map(entry -> new ChartData(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    // 3. Media Acquisition Trends Over Time
    public List<ChartData> getMediaAcquisitionTrends() {
        return catalogItemRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(CatalogItem::getEdition_year, Collectors.counting()))
                .entrySet()
                .stream()
                .map(entry -> new ChartData(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    // 4. Top Media Types by Borrow Count
    public List<ChartData> getTopMediaTypesByBorrowCount() {
        return catalogItemRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(item -> item.getMediaType().getName(), Collectors.counting()))
                .entrySet()
                .stream()
                .map(entry -> new ChartData(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}


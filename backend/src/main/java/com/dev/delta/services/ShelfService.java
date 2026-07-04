package com.dev.delta.services;

import com.dev.delta.entities.Shelf;
import com.dev.delta.repositories.ShelfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ShelfService {

    @Autowired
    private ShelfRepository shelfRepository;


    public Iterable<Shelf> findAll() {
        return shelfRepository.findAll();
    }


    public Optional<Shelf> findById(Long id) {
        return shelfRepository.findById(id);
    }


    public Shelf save(Shelf shelf) {
        return shelfRepository.save(shelf);
    }


    public void deleteById(Long id) {
        shelfRepository.deleteById(id);
    }
}

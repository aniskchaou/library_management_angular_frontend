package com.dev.delta.controllers;

import com.dev.delta.entities.AudioBook;
import com.dev.delta.repositories.AudioBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for the Audiobook digital collection.
 * Endpoints: /audiobook/**
 */
@RestController
@RequestMapping("audiobook")
@CrossOrigin(origins = "*")
public class AudioBookController {

    @Autowired
    private AudioBookRepository audioBookRepository;

    @GetMapping("/all")
    public List<AudioBook> getAll() {
        return audioBookRepository.findAll();
    }

    @GetMapping("/active")
    public List<AudioBook> getActive() {
        return audioBookRepository.findByActiveTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AudioBook> getById(@PathVariable Long id) {
        return audioBookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/genre/{genre}")
    public List<AudioBook> getByGenre(@PathVariable String genre) {
        return audioBookRepository.findByGenreIgnoreCase(genre);
    }

    @GetMapping("/search/{query}")
    public List<AudioBook> search(@PathVariable String query) {
        return audioBookRepository.search(query);
    }

    @PostMapping("/create")
    public AudioBook create(@RequestBody AudioBook audioBook) {
        return audioBookRepository.save(audioBook);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AudioBook> update(@PathVariable Long id, @RequestBody AudioBook updated) {
        return audioBookRepository.findById(id).map(a -> {
            a.setTitle(updated.getTitle());
            a.setAuthor(updated.getAuthor());
            a.setNarrator(updated.getNarrator());
            a.setDurationMinutes(updated.getDurationMinutes());
            a.setFileUrl(updated.getFileUrl());
            a.setCoverUrl(updated.getCoverUrl());
            a.setIsbn(updated.getIsbn());
            a.setLanguage(updated.getLanguage());
            a.setGenre(updated.getGenre());
            a.setPublisher(updated.getPublisher());
            a.setPublishDate(updated.getPublishDate());
            a.setFormat(updated.getFormat());
            a.setDescription(updated.getDescription());
            a.setPrice(updated.getPrice());
            a.setActive(updated.isActive());
            return ResponseEntity.ok(audioBookRepository.save(a));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        audioBookRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }

    /** Soft-deactivate instead of delete */
    @PostMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivate(@PathVariable Long id) {
        return audioBookRepository.findById(id).map(a -> {
            a.setActive(false);
            return ResponseEntity.ok(audioBookRepository.save(a));
        }).orElse(ResponseEntity.notFound().build());
    }
}

package com.dev.delta.services;

import com.dev.delta.entities.BookingSettings;
import com.dev.delta.repositories.BookingSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingSettingsService {

    @Autowired
    private BookingSettingsRepository bookingSettingsRepository;

    public List<BookingSettings> findAll() {
        return bookingSettingsRepository.findAll();
    }

    public Optional<BookingSettings> findById(Long id) {
        return bookingSettingsRepository.findById(id);
    }

    public BookingSettings save(BookingSettings bookingSettings) {
        return bookingSettingsRepository.save(bookingSettings);
    }

    public void deleteById(Long id) {
        bookingSettingsRepository.deleteById(id);
    }
}


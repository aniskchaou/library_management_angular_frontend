package com.dev.delta.services;

import com.dev.delta.entities.Hold;
import com.dev.delta.repositories.HoldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HoldService {

    @Autowired
    private HoldRepository holdRepository;

    public List<Hold> findAll() {
        return holdRepository.findAll();
    }

    public Optional<Hold> findById(Long id) {
        return holdRepository.findById(id);
    }

    public Hold save(Hold hold) {
        return holdRepository.save(hold);
    }

    public void deleteById(Long id) {
        holdRepository.deleteById(id);
    }
}


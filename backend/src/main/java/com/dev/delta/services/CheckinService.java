package com.dev.delta.services;

import com.dev.delta.entities.Checkin;
import com.dev.delta.repositories.CheckinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CheckinService {

    @Autowired
    private CheckinRepository checkinRepository;

    public List<Checkin> findAll() {
        return checkinRepository.findAll();
    }

    public Optional<Checkin> findById(Long id) {
        return checkinRepository.findById(id);
    }

    public Checkin save(Checkin checkin) {
        return checkinRepository.save(checkin);
    }

    public void deleteById(Long id) {
        checkinRepository.deleteById(id);
    }
}


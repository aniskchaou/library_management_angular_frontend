package com.dev.delta.services;

import com.dev.delta.entities.Overdue;
import com.dev.delta.repositories.OverdueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OverdueService {

    @Autowired
    private OverdueRepository overdueRepository;

    public List<Overdue> findAll() {
        return overdueRepository.findAll();
    }

    public Optional<Overdue> findById(Long id) {
        return overdueRepository.findById(id);
    }

    public Overdue save(Overdue overdue) {
        return overdueRepository.save(overdue);
    }

    public void deleteById(Long id) {
        overdueRepository.deleteById(id);
    }
}

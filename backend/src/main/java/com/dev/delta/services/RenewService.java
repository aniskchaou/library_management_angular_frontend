package com.dev.delta.services;

import com.dev.delta.entities.Renewal;
import com.dev.delta.repositories.RenewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RenewService {

    @Autowired
    private RenewRepository renewRepository;

    public List<Renewal> findAll() {
        return renewRepository.findAll();
    }

    public Optional<Renewal> findById(Long id) {
        return renewRepository.findById(id);
    }

    public Renewal save(Renewal renew) {
        return renewRepository.save(renew);
    }

    public void deleteById(Long id) {
        renewRepository.deleteById(id);
    }
}


package com.dev.delta.services;

import com.dev.delta.entities.Fund;
import com.dev.delta.repositories.FundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FundService {

    @Autowired
    private FundRepository fundRepository;

    public List<Fund> findAll() {
        return fundRepository.findAll();
    }

    public Optional<Fund> findById(Long id) {
        return fundRepository.findById(id);
    }

    public Fund save(Fund fund) {
        return fundRepository.save(fund);
    }

    public void deleteById(Long id) {
        fundRepository.deleteById(id);
    }
}

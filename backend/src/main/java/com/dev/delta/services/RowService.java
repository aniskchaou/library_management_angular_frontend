package com.dev.delta.services;

import com.dev.delta.entities.Renewal;
import com.dev.delta.entities.Row;
import com.dev.delta.entities.Shelf;
import com.dev.delta.repositories.RenewRepository;
import com.dev.delta.repositories.RowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RowService {
    @Autowired
    private RowRepository rowRepository;

    public List<Row> findAll() {
        return rowRepository.findAll();
    }

    public Row save(Row shelf) {
        return rowRepository.save(shelf);
    }
}

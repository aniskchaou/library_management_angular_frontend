package com.dev.delta.services;

import com.dev.delta.entities.Departement;
import com.dev.delta.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Departement> findAll() {
        List list=departmentRepository.findAll();
        Collections.reverse(list);
        return list;
    }

    public Optional<Departement> findById(Long id) {
        return departmentRepository.findById(id);
    }

    public Departement save(Departement department) {
        return departmentRepository.save(department);
    }

    public void deleteById(Long id) {
        departmentRepository.deleteById(id);
    }
}


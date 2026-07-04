package com.dev.delta.repositories;

import com.dev.delta.entities.BarCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarCodeRepository extends JpaRepository<BarCode, Long> {
}


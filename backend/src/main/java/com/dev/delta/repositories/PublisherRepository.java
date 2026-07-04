package com.dev.delta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entities.Publisher;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {

}

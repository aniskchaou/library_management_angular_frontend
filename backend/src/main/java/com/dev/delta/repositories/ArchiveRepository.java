package com.dev.delta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entities.Archive;

public interface ArchiveRepository extends JpaRepository<Archive, Long> {

}

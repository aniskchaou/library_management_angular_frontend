package com.dev.delta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entities.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {

}

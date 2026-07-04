package com.dev.delta.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entities.ImageModel;

public interface ImageModelrepository extends JpaRepository<ImageModel, Long> {

	Optional<ImageModel> findByName(String imageName);

}

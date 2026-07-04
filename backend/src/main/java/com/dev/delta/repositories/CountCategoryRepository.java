package com.dev.delta.repositories;

import com.dev.delta.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CountCategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT COUNT(i) FROM Category i WHERE i.id = :categoryId")
    long countByCategoryId(@Param("categoryId") Long categoryId);
}

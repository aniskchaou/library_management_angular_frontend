package com.dev.delta.repositories;

import com.dev.delta.entities.AudioBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AudioBookRepository extends JpaRepository<AudioBook, Long> {
    List<AudioBook> findByActiveTrue();
    List<AudioBook> findByGenreIgnoreCase(String genre);

    @Query("SELECT a FROM AudioBook a WHERE LOWER(a.title) LIKE LOWER(CONCAT('%',:q,'%')) " +
           "OR LOWER(a.author) LIKE LOWER(CONCAT('%',:q,'%')) " +
           "OR LOWER(a.narrator) LIKE LOWER(CONCAT('%',:q,'%'))")
    List<AudioBook> search(@Param("q") String query);
}

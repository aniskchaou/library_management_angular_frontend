package com.dev.delta.repositories;

import com.dev.delta.entities.BookReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookReviewRepository extends JpaRepository<BookReview, Long> {
    List<BookReview> findByCatalogItemIdOrderByReviewDateDesc(Long bookId);
    List<BookReview> findByMemberIdOrderByReviewDateDesc(Long memberId);
    Optional<BookReview> findByMemberIdAndCatalogItemId(Long memberId, Long bookId);

    @Query("SELECT AVG(r.rating) FROM BookReview r WHERE r.catalogItem.id = :bookId AND r.reported = false")
    Double averageRatingForBook(Long bookId);
}

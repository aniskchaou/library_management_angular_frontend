package com.dev.delta.controllers;

import com.dev.delta.entities.BookReview;
import com.dev.delta.entities.CatalogItem;
import com.dev.delta.entities.Member;
import com.dev.delta.repositories.BookReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("review")
@CrossOrigin(origins = "*")
public class BookReviewController {

    @Autowired
    private BookReviewRepository reviewRepository;

    /** Get all reviews for a book. */
    @GetMapping("/book/{bookId}")
    public List<BookReview> getForBook(@PathVariable Long bookId) {
        return reviewRepository.findByCatalogItemIdOrderByReviewDateDesc(bookId);
    }

    /** Get all reviews by a member. */
    @GetMapping("/member/{memberId}")
    public List<BookReview> getByMember(@PathVariable Long memberId) {
        return reviewRepository.findByMemberIdOrderByReviewDateDesc(memberId);
    }

    /** Average rating for a book. */
    @GetMapping("/book/{bookId}/average")
    public ResponseEntity<?> averageRating(@PathVariable Long bookId) {
        Double avg = reviewRepository.averageRatingForBook(bookId);
        return ResponseEntity.ok(Map.of("bookId", bookId, "averageRating", avg != null ? avg : 0.0));
    }

    /**
     * Add or update a review.
     * Body: { memberId, bookId, rating (1-5), reviewText }
     */
    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody Map<String, Object> body) {
        Long memberId = Long.parseLong(body.get("memberId").toString());
        Long bookId   = Long.parseLong(body.get("bookId").toString());
        int  rating   = Integer.parseInt(body.get("rating").toString());

        if (rating < 1 || rating > 5) {
            return ResponseEntity.badRequest().body("Rating must be between 1 and 5");
        }

        // Upsert: one review per member per book
        Optional<BookReview> existing = reviewRepository.findByMemberIdAndCatalogItemId(memberId, bookId);
        BookReview review = existing.orElse(new BookReview());

        if (review.getId() == null) {
            Member m = new Member();
            m.setId(memberId);
            review.setMember(m);

            CatalogItem book = new CatalogItem();
            book.setId(bookId);
            review.setCatalogItem(book);
        }

        review.setRating(rating);
        review.setReviewText(body.getOrDefault("reviewText", "").toString());
        review.setReviewDate(LocalDate.now());
        review.setReported(false);

        return ResponseEntity.ok(reviewRepository.save(review));
    }

    /** Flag a review as reported/inappropriate. */
    @PostMapping("/{id}/report")
    public ResponseEntity<?> report(@PathVariable Long id) {
        return reviewRepository.findById(id).map(r -> {
            r.setReported(true);
            return ResponseEntity.ok(reviewRepository.save(r));
        }).orElse(ResponseEntity.notFound().build());
    }

    /** Admin: delete a review. */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }
}

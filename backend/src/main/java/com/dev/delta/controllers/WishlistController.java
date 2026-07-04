package com.dev.delta.controllers;

import com.dev.delta.entities.CatalogItem;
import com.dev.delta.entities.Member;
import com.dev.delta.entities.Wishlist;
import com.dev.delta.repositories.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    /** Get all wishlist items for a member. */
    @GetMapping("/member/{memberId}")
    public List<Wishlist> getByMember(@PathVariable Long memberId) {
        return wishlistRepository.findByMemberIdOrderByAddedDateDesc(memberId);
    }

    /** Add a book to a member's wishlist (idempotent — ignores duplicates). */
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Map<String, Object> body) {
        Long memberId = Long.parseLong(body.get("memberId").toString());
        Long bookId   = Long.parseLong(body.get("bookId").toString());

        if (wishlistRepository.existsByMemberIdAndCatalogItemId(memberId, bookId)) {
            return ResponseEntity.ok(Map.of("message", "Already in wishlist"));
        }

        Wishlist item = new Wishlist();
        Member m = new Member();
        m.setId(memberId);
        item.setMember(m);

        CatalogItem book = new CatalogItem();
        book.setId(bookId);
        item.setCatalogItem(book);

        item.setAddedDate(LocalDate.now());

        Object notify = body.get("notifyWhenAvailable");
        item.setNotifyWhenAvailable(notify != null && Boolean.parseBoolean(notify.toString()));

        return ResponseEntity.ok(wishlistRepository.save(item));
    }

    /** Remove a wishlist item by its own ID. */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        wishlistRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }
}

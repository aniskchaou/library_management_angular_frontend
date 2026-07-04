package com.dev.delta.controllers;

import com.dev.delta.entities.Coupon;
import com.dev.delta.repositories.CouponRepository;
import com.stripe.model.PromotionCode;
import com.stripe.param.PromotionCodeCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/super-admin/coupons")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class CouponController {

    @Autowired
    private CouponRepository couponRepo;

    @GetMapping
    public List<Coupon> getAll() { return couponRepo.findAll(); }

    @GetMapping("/active")
    public List<Coupon> getActive() { return couponRepo.findByStatus(Coupon.CouponStatus.ACTIVE); }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Coupon coupon) {
        if (couponRepo.findByCode(coupon.getCode()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Coupon code already exists"));
        }
        // Optionally create in Stripe as well
        // com.stripe.model.Coupon stripeCoupon = com.stripe.model.Coupon.create(...)
        return ResponseEntity.ok(couponRepo.save(coupon));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Coupon updates) {
        return couponRepo.findById(id).map(c -> {
            if (updates.getDescription() != null) c.setDescription(updates.getDescription());
            if (updates.getMaxRedemptions() != null) c.setMaxRedemptions(updates.getMaxRedemptions());
            if (updates.getExpiresAt() != null) c.setExpiresAt(updates.getExpiresAt());
            if (updates.getStatus() != null) c.setStatus(updates.getStatus());
            return ResponseEntity.ok(couponRepo.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        return couponRepo.findByCode(code).map(c -> {
            if (c.getStatus() != Coupon.CouponStatus.ACTIVE) {
                return ResponseEntity.badRequest().body(Map.of("valid", false, "reason", "Coupon is not active"));
            }
            if (c.getExpiresAt() != null && c.getExpiresAt().isBefore(LocalDate.now())) {
                c.setStatus(Coupon.CouponStatus.EXPIRED);
                couponRepo.save(c);
                return ResponseEntity.badRequest().body(Map.of("valid", false, "reason", "Coupon expired"));
            }
            if (c.getMaxRedemptions() != null && c.getTimesRedeemed() >= c.getMaxRedemptions()) {
                c.setStatus(Coupon.CouponStatus.USED_UP);
                couponRepo.save(c);
                return ResponseEntity.badRequest().body(Map.of("valid", false, "reason", "Coupon fully redeemed"));
            }
            return ResponseEntity.ok(Map.of("valid", true, "discountType", c.getDiscountType(),
                    "discountValue", c.getDiscountValue()));
        }).orElse(ResponseEntity.badRequest().body(Map.of("valid", false, "reason", "Coupon not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        couponRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}

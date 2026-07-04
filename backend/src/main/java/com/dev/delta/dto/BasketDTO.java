package com.dev.delta.dto;

import com.dev.delta.entities.Basket;
import com.dev.delta.entities.Vendor;
import com.dev.delta.repositories.BasketRepository;
import com.dev.delta.repositories.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class BasketDTO implements DTO {

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private VendorRepository vendorRepository;

    private static final String[] INTERNAL_NOTES = {
            "Internal note for basket 1.",
            "Review items for accuracy.",
            "Verify vendor details.",
            "Check for item availability.",
            "Ensure correct delivery address."
    };

    private static final String[] INTERNAL_NOTES_VIETNAMESE = {
            "Ghi chú nội bộ cho giỏ hàng 1.",
            "Kiểm tra các mục để đảm bảo chính xác.",
            "Xác minh chi tiết nhà cung cấp.",
            "Kiểm tra tính khả dụng của mặt hàng.",
            "Đảm bảo địa chỉ giao hàng chính xác."
    };

    private static final String[] VENDOR_NOTES = {
            "Please confirm delivery date.",
            "Vendor contact number is required.",
            "Additional items may be included.",
            "Discounts applied as per agreement.",
            "Confirm receipt of payment."
    };

    private static final String[] VENDOR_NOTES_VIETNAMESE = {
            "Vui lòng xác nhận ngày giao hàng.",
            "Cần số liên lạc của nhà cung cấp.",
            "Có thể bao gồm các mặt hàng bổ sung.",
            "Giảm giá được áp dụng theo thỏa thuận.",
            "Xác nhận đã nhận thanh toán."
    };

    @Override
    public void populate() {
        List<Vendor> vendors = vendorRepository.findAll();

        if (vendors.isEmpty()) {
            throw new RuntimeException("No vendors found to associate with baskets.");
        }

        for (int i = 1; i <= 15; i++) {
            Basket basket = new Basket();
            basket.setBasketName("Giỏ hàng " + i);
            basket.setBillingPlace("Nơi thanh toán " + i);
            basket.setDeliveryPlace("Nơi giao hàng " + i);
            basket.setVendor(randomVendor(vendors));
            basket.setInternalNote(randomElement(INTERNAL_NOTES_VIETNAMESE));
            basket.setVendorNote(randomElement(VENDOR_NOTES_VIETNAMESE));
            basket.setCreateItemsWhen(generateRandomDate());

            basketRepository.save(basket);
        }
    }

    private Vendor randomVendor(List<Vendor> vendors) {
        Random random = new Random();
        return vendors.get(random.nextInt(vendors.size()));
    }

    private Date generateRandomDate() {
        Random random = new Random();
        long currentTime = System.currentTimeMillis();
        long randomTime = currentTime - (long) (random.nextDouble() * 1000000000L); // Random date in the past 30 days
        return new Date(randomTime);
    }

    private String randomElement(String[] array) {
        Random random = new Random();
        return array[random.nextInt(array.length)];
    }
}


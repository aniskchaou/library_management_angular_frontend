package com.dev.delta.controllers;

import com.dev.delta.entities.Basket;
import com.dev.delta.services.BasketService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("basket")
@CrossOrigin(origins = "*")
@Api(value = "BasketController", description = "Controller for Baskets")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @ApiOperation(value = "Add Basket")
    @PostMapping("/create")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Bad Request")
    })
    public ResponseEntity<?> addBasket(@RequestBody Basket basket, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Basket newBasket = basketService.save(basket);
        return new ResponseEntity<>(newBasket, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Baskets")
    @GetMapping("/all")
    public Iterable<Basket> getAllBaskets() {
        return basketService.findAll();
    }

    @ApiOperation(value = "Get Basket by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Basket> getBasketById(@PathVariable Long id) {
        Optional<Basket> basket = basketService.findById(id);
        return basket.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @ApiOperation(value = "Delete Basket by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBasket(@PathVariable Long id) {
        if (!basketService.findById(id).isPresent()) {
            return new ResponseEntity<>("Basket not found", HttpStatus.NOT_FOUND);
        }
        basketService.deleteById(id);
        return new ResponseEntity<>("Basket was deleted", HttpStatus.OK);
    }

    // Additional endpoint for a specific feature if needed
    @ApiOperation(value = "Update Basket Details")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBasket(@PathVariable Long id,  @RequestBody Basket basketDetails, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Optional<Basket> existingBasket = basketService.findById(id);
        if (!existingBasket.isPresent()) {
            return new ResponseEntity<>("Basket not found", HttpStatus.NOT_FOUND);
        }

        Basket basket = existingBasket.get();
        basket.setBasketName(basketDetails.getBasketName());
        basket.setBillingPlace(basketDetails.getBillingPlace());
        basket.setDeliveryPlace(basketDetails.getDeliveryPlace());
        basket.setVendor(basketDetails.getVendor());
        basket.setInternalNote(basketDetails.getInternalNote());
        basket.setVendorNote(basketDetails.getVendorNote());
        basket.setCreateItemsWhen(basketDetails.getCreateItemsWhen());

        Basket updatedBasket = basketService.save(basket);
        return new ResponseEntity<>(updatedBasket, HttpStatus.OK);
    }
}

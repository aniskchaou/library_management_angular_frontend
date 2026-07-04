package com.dev.delta.controllers;

import com.dev.delta.entities.PurchaseSuggestion;
import com.dev.delta.services.PurchaseSuggestionService;
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
@RequestMapping("purchase-suggestion")
@CrossOrigin(origins = "*")
@Api(value = "PurchaseSuggestionController", description = "Controller for Purchase Suggestions")
public class PurchaseSuggestionController {

    @Autowired
    private PurchaseSuggestionService purchaseSuggestionService;

    @ApiOperation(value = "Add Purchase Suggestion")
    @PostMapping("/create")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Bad Request")
    })
    public ResponseEntity<?> addPurchaseSuggestion( @RequestBody PurchaseSuggestion purchaseSuggestion, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        PurchaseSuggestion newPurchaseSuggestion = purchaseSuggestionService.save(purchaseSuggestion);
        return new ResponseEntity<>(newPurchaseSuggestion, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Purchase Suggestions")
    @GetMapping("/all")
    public Iterable<PurchaseSuggestion> getAllPurchaseSuggestions() {
        return purchaseSuggestionService.findAll();
    }

    @ApiOperation(value = "Get Purchase Suggestion by ID")
    @GetMapping("/{id}")
    public ResponseEntity<PurchaseSuggestion> getPurchaseSuggestionById(@PathVariable Long id) {
        Optional<PurchaseSuggestion> purchaseSuggestion = purchaseSuggestionService.findById(id);
        return purchaseSuggestion.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @ApiOperation(value = "Delete Purchase Suggestion by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePurchaseSuggestion(@PathVariable Long id) {
        /*if (purchaseSuggestionService.findById(id).isEmpty()) {
            return new ResponseEntity<>("Purchase Suggestion not found", HttpStatus.NOT_FOUND);
        }*/
        purchaseSuggestionService.deleteById(id);
        return new ResponseEntity<>("Purchase Suggestion was deleted", HttpStatus.OK);
    }

    @ApiOperation(value = "Update Purchase Suggestion Details")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePurchaseSuggestion(@PathVariable Long id,  @RequestBody PurchaseSuggestion purchaseSuggestionDetails, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Optional<PurchaseSuggestion> existingPurchaseSuggestion = purchaseSuggestionService.findById(id);
      /*  if (existingPurchaseSuggestion.isEmpty()) {
            return new ResponseEntity<>("Purchase Suggestion not found", HttpStatus.NOT_FOUND);
        }*/

        PurchaseSuggestion purchaseSuggestion = existingPurchaseSuggestion.get();
        purchaseSuggestion.setTitle(purchaseSuggestionDetails.getTitle());
        purchaseSuggestion.setAuthor(purchaseSuggestionDetails.getAuthor());
        purchaseSuggestion.setCopyrightDate(purchaseSuggestionDetails.getCopyrightDate());
        purchaseSuggestion.setIsbnIssnOtherStandardNumber(purchaseSuggestionDetails.getIsbnIssnOtherStandardNumber());
        purchaseSuggestion.setPublisher(purchaseSuggestionDetails.getPublisher());
        purchaseSuggestion.setPublicationPlace(purchaseSuggestionDetails.getPublicationPlace());
        purchaseSuggestion.setCollectionTitle(purchaseSuggestionDetails.getCollectionTitle());
        purchaseSuggestion.setMediaType(purchaseSuggestionDetails.getMediaType());
        purchaseSuggestion.setReasonForSuggestion(purchaseSuggestionDetails.getReasonForSuggestion());
        purchaseSuggestion.setNotes(purchaseSuggestionDetails.getNotes());
        purchaseSuggestion.setFund(purchaseSuggestionDetails.getFund());
        purchaseSuggestion.setShowInactive(purchaseSuggestionDetails.getShowInactive());
        purchaseSuggestion.setCopies(purchaseSuggestionDetails.getCopies());
        purchaseSuggestion.setCurrency(purchaseSuggestionDetails.getCurrency());
        purchaseSuggestion.setPrice(purchaseSuggestionDetails.getPrice());
        purchaseSuggestion.setTotal(purchaseSuggestionDetails.getTotal());

        PurchaseSuggestion updatedPurchaseSuggestion = purchaseSuggestionService.save(purchaseSuggestion);
        return new ResponseEntity<>(updatedPurchaseSuggestion, HttpStatus.OK);
    }

    // Endpoint to change the status to "pending"
    @GetMapping("/{id}/status/pending")
    public ResponseEntity<PurchaseSuggestion> setPending(@PathVariable Long id) {
        PurchaseSuggestion updatedSuggestion = purchaseSuggestionService.updateStatus(id, "pending");
        return ResponseEntity.ok(updatedSuggestion);
    }

    // Endpoint to change the status to "approved"
    @GetMapping("/{id}/status/approved")
    public ResponseEntity<PurchaseSuggestion> setApproved(@PathVariable Long id) {
        PurchaseSuggestion updatedSuggestion = purchaseSuggestionService.updateStatus(id, "approved");
        return ResponseEntity.ok(updatedSuggestion);
    }

    // Endpoint to change the status to "rejected"
    @GetMapping("/{id}/status/rejected")
    public ResponseEntity<PurchaseSuggestion> setRejected(@PathVariable Long id) {
        PurchaseSuggestion updatedSuggestion = purchaseSuggestionService.updateStatus(id, "rejected");
        return ResponseEntity.ok(updatedSuggestion);
    }
}

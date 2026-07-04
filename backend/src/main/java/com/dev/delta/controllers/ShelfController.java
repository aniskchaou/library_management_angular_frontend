package com.dev.delta.controllers;



import com.dev.delta.entities.Shelf;
import com.dev.delta.services.ShelfService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("shelf")
@CrossOrigin(origins = "*")
@Api(value = "ShelfController", description = "Controller for Shelves")
public class ShelfController {

    @Autowired
    private ShelfService shelfService;

    @ApiOperation(value = "Add Shelf")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addShelf(@Validated @RequestBody Shelf shelf, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Shelf newShelf = shelfService.save(shelf);
        return new ResponseEntity<>(newShelf, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Shelves")
    @GetMapping("/all")
    public Iterable<Shelf> getAllShelves() {
        return shelfService.findAll();
    }

    @ApiOperation(value = "Get Shelf by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Shelf> getShelfById(@PathVariable Long id) throws Exception {
        Shelf shelf = shelfService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(shelf, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Shelf by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteShelf(@PathVariable Long id) throws Exception {
        shelfService.deleteById(id);
        return new ResponseEntity<>("Shelf was deleted", HttpStatus.OK);
    }
}


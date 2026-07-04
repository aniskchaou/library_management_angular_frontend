package com.dev.delta.controllers;

import com.dev.delta.entities.BookingSettings;
import com.dev.delta.services.BookingSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("bookingSettings")
@CrossOrigin(origins = "*")
@Api(value = "BookingSettingsController", description = "Controller for Booking Settings")
public class BookingSettingsController {

    @Autowired
    private BookingSettingsService bookingSettingsService;

    @ApiOperation(value = "Add Booking Settings")
    @PostMapping("/create")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found")})
    public ResponseEntity<?> addBookingSettings(@Validated @RequestBody BookingSettings bookingSettings, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        BookingSettings newSettings = bookingSettingsService.save(bookingSettings);
        return new ResponseEntity<>(newSettings, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Booking Settings")
    @GetMapping("/all")
    public Iterable<BookingSettings> getAllBookingSettings() {
        return bookingSettingsService.findAll();
    }

    @ApiOperation(value = "Get Booking Settings by ID")
    @GetMapping("/{id}")
    public ResponseEntity<BookingSettings> getBookingSettingsById(@PathVariable Long id) throws Exception {
        BookingSettings bookingSettings = bookingSettingsService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(bookingSettings, HttpStatus.OK);
    }
}

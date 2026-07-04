package com.dev.delta.controllers;
import com.dev.delta.entities.Basket;
import com.dev.delta.entities.QRCode;
import com.dev.delta.entities.Row;
import com.dev.delta.services.QRCodeService;
import com.dev.delta.services.RowService;
import com.google.zxing.WriterException;
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

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("row")
@CrossOrigin(origins = "*")
//@Api(value = "QRCodeController", description = "Controller for QR Codes")
public class RowController {

    @Autowired
    private RowService qrCodeService;

 /*   @ApiOperation(value = "Add QR Code")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addQRCode(@Validated @RequestBody Row qrCode, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        QRCode newQRCode = qrCodeService.save(qrCode);
        return new ResponseEntity<>(newQRCode, HttpStatus.CREATED);
    }*/

    @PostMapping("/create")
    public ResponseEntity<?> addBasket(@RequestBody Row basket, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Row newBasket = qrCodeService.save(basket);
        return new ResponseEntity<>(newBasket, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All QR Codes")
    @GetMapping("/all")
    public Iterable<Row> getAllQRCodes() {
        return qrCodeService.findAll();
    }
/*
    @ApiOperation(value = "Get QR Code by ISBN")
    @GetMapping("/{isbn}")
    public ResponseEntity<QRCode> getQRCodeByIsbn(@PathVariable Long isbn) throws Exception {
        QRCode qrCode = qrCodeService.findById(isbn).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(qrCode, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete QR Code by ISBN")
    @DeleteMapping("/delete/{isbn}")
    public ResponseEntity<String> deleteQRCode(@PathVariable Long isbn) throws Exception {
        qrCodeService.deleteById(isbn);
        return new ResponseEntity<>("QR Code was deleted", HttpStatus.OK);
    }



    @GetMapping("/saveQRCode")
    public String saveQRCode(@RequestParam("text") String text) {
        try {
            // Specify the path where you want to save the QR code image
            String filePath = "978-3-16-148410-0.png";

            // Save the QR code image to disk
            qrCodeService.saveQRCodeToFile(text, filePath);

            return "QR Code saved to " + filePath;
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return "Error saving QR Code: " + e.getMessage();
        }
    }*/
}


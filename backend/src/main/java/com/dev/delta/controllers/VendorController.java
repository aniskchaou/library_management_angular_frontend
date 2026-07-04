package com.dev.delta.controllers;
import com.dev.delta.entities.Vendor;
import com.dev.delta.services.VendorService;
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
@RequestMapping("vendor")
@CrossOrigin(origins = "*")
@Api(value = "VendorController", description = "Controller for Vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @ApiOperation(value = "Add Vendor")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addVendor(@Validated @RequestBody Vendor vendor, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Vendor newVendor = vendorService.save(vendor);
        return new ResponseEntity<>(newVendor, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Vendors")
    @GetMapping("/all")
    public Iterable<Vendor> getAllVendors() {
        return vendorService.findAll();
    }

    @ApiOperation(value = "Get Vendor by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable Long id) throws Exception {
        Vendor vendor = vendorService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(vendor, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Vendor by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteVendor(@PathVariable Long id) throws Exception {
        vendorService.deleteById(id);
        return new ResponseEntity<>("Vendor was deleted", HttpStatus.OK);
    }
}


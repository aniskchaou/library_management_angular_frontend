package com.dev.delta.controllers;

import com.dev.delta.entities.Fund;
import com.dev.delta.services.FundService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("fund")
@CrossOrigin(origins = "*")
@Api(value = "FundController", description = "Controller for Fund Management")
public class FundController {

    @Autowired
    private FundService fundService;

    @ApiOperation(value = "Add Fund")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 400, message = "validation error")
    })
    @PostMapping(value = "/create", consumes = MediaType.ALL_VALUE)
    public ResponseEntity<?> addFund(@RequestBody Fund fund, BindingResult result) {
        Fund newFund = fundService.save(fund);
        return new ResponseEntity<>(newFund, HttpStatus.CREATED);
    }


    @ApiOperation(value = "Get All Funds")
    @GetMapping("/all")
    public Iterable<Fund> getAllFunds() {
        return fundService.findAll();
    }

    @ApiOperation(value = "Get Fund by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Fund> getFundById(@PathVariable Long id) throws Exception {
        Fund fund = fundService.findById(id)
                .orElseThrow(() -> new Exception("Fund not found"));
        return new ResponseEntity<>(fund, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Fund by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFund(@PathVariable Long id) throws Exception {
        fundService.deleteById(id);
        return new ResponseEntity<>("Fund was deleted", HttpStatus.OK);
    }
}

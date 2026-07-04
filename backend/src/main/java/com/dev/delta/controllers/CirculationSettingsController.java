package com.dev.delta.controllers;

import com.dev.delta.entities.CirculationSettings;
import com.dev.delta.services.CirculationSettingsService;
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
@RequestMapping("circulationSettings")
@CrossOrigin(origins = "*")
@Api(value = "CirculationSettingsController", description = "Controller for Circulation Settings")
public class CirculationSettingsController {

    @Autowired
    private CirculationSettingsService circulationSettingsService;

    @ApiOperation(value = "Add Circulation Settings")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addCirculationSettings(@Validated @RequestBody CirculationSettings circulationSettings, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        CirculationSettings newSettings = circulationSettingsService.save(circulationSettings);
        return new ResponseEntity<>(newSettings, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Circulation Settings")
    @GetMapping("/all")
    public Iterable<CirculationSettings> getAllCirculationSettings() {
        return circulationSettingsService.findAll();
    }

    @ApiOperation(value = "Get Circulation Settings by ID")
    @GetMapping("/{id}")
    public ResponseEntity<CirculationSettings> getCirculationSettingsById(@PathVariable Long id) throws Exception {
        CirculationSettings circulationSettings = circulationSettingsService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(circulationSettings, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Circulation Settings by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCirculationSettings(@PathVariable Long id) throws Exception {
        circulationSettingsService.deleteById(id);
        return new ResponseEntity<>("Circulation Settings were deleted", HttpStatus.OK);
    }
}


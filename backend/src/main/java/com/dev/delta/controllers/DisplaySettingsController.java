package com.dev.delta.controllers;
import com.dev.delta.entities.DisplaySettings;
import com.dev.delta.services.DisplaySettingsService;
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
@RequestMapping("displaySettings")
@CrossOrigin(origins = "*")
@Api(value = "DisplaySettingsController", description = "Controller for Display Settings")
public class DisplaySettingsController {

    @Autowired
    private DisplaySettingsService displaySettingsService;

    @ApiOperation(value = "Add Display Settings")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addDisplaySettings(@Validated @RequestBody DisplaySettings displaySettings, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        DisplaySettings newSettings = displaySettingsService.save(displaySettings);
        return new ResponseEntity<>(newSettings, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Display Settings")
    @GetMapping("/all")
    public Iterable<DisplaySettings> getAllDisplaySettings() {
        return displaySettingsService.findAll();
    }

    @ApiOperation(value = "Get Display Settings by ID")
    @GetMapping("/{id}")
    public ResponseEntity<DisplaySettings> getDisplaySettingsById(@PathVariable Long id) throws Exception {
        DisplaySettings displaySettings = displaySettingsService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(displaySettings, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Display Settings by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDisplaySettings(@PathVariable Long id) throws Exception {
        displaySettingsService.deleteById(id);
        return new ResponseEntity<>("Display Settings were deleted", HttpStatus.OK);
    }
}


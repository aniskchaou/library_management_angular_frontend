package com.dev.delta.controllers;
import com.dev.delta.entities.BackupSettings;
import com.dev.delta.services.BackupSettingsService;
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
@RequestMapping("backupSettings")
@CrossOrigin(origins = "*")
@Api(value = "BackupSettingsController", description = "Controller for Backup Settings")
public class BackupSettingsController {

    @Autowired
    private BackupSettingsService backupSettingsService;

    @ApiOperation(value = "Add Backup Settings")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addBackupSettings(@Validated @RequestBody BackupSettings backupSettings, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        BackupSettings newSettings = backupSettingsService.save(backupSettings);
        return new ResponseEntity<>(newSettings, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Backup Settings")
    @GetMapping("/all")
    public Iterable<BackupSettings> getAllBackupSettings() {
        return backupSettingsService.findAll();
    }

    @ApiOperation(value = "Get Backup Settings by ID")
    @GetMapping("/{id}")
    public ResponseEntity<BackupSettings> getBackupSettingsById(@PathVariable Long id) throws Exception {
        BackupSettings backupSettings = backupSettingsService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(backupSettings, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Backup Settings by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBackupSettings(@PathVariable Long id) throws Exception {
        backupSettingsService.deleteById(id);
        return new ResponseEntity<>("Backup Settings were deleted", HttpStatus.OK);
    }
}


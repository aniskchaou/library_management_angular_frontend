package com.dev.delta.controllers;
import com.dev.delta.entities.NotificationSettings;
import com.dev.delta.services.NotificationSettingsService;
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
@RequestMapping("notificationSettings")
@CrossOrigin(origins = "*")
@Api(value = "NotificationSettingsController", description = "Controller for Notification Settings")
public class NotificationSettingsController {

    @Autowired
    private NotificationSettingsService notificationSettingsService;

    @ApiOperation(value = "Add Notification Settings")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addNotificationSettings(@Validated @RequestBody NotificationSettings notificationSettings, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        NotificationSettings newSettings = notificationSettingsService.save(notificationSettings);
        return new ResponseEntity<>(newSettings, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Notification Settings")
    @GetMapping("/all")
    public Iterable<NotificationSettings> getAllNotificationSettings() {
        return notificationSettingsService.findAll();
    }

    @ApiOperation(value = "Get Notification Settings by ID")
    @GetMapping("/{id}")
    public ResponseEntity<NotificationSettings> getNotificationSettingsById(@PathVariable Long id) throws Exception {
        NotificationSettings notificationSettings = notificationSettingsService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(notificationSettings, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Notification Settings by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNotificationSettings(@PathVariable Long id) throws Exception {
        notificationSettingsService.deleteById(id);
        return new ResponseEntity<>("Notification Settings were deleted", HttpStatus.OK);
    }
}


package com.dev.delta.controllers;
import com.dev.delta.entities.UserSettings;
import com.dev.delta.services.UserSettingsService;
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
@RequestMapping("userSettings")
@CrossOrigin(origins = "*")
@Api(value = "UserSettingsController", description = "Controller for User Settings")
public class UserSettingsController {

    @Autowired
    private UserSettingsService userSettingsService;

    @ApiOperation(value = "Add User Settings")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addUserSettings(@Validated @RequestBody UserSettings userSettings, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        UserSettings newSettings = userSettingsService.save(userSettings);
        return new ResponseEntity<>(newSettings, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All User Settings")
    @GetMapping("/all")
    public Iterable<UserSettings> getAllUserSettings() {
        return userSettingsService.findAll();
    }

    @ApiOperation(value = "Get User Settings by ID")
    @GetMapping("/{id}")
    public ResponseEntity<UserSettings> getUserSettingsById(@PathVariable Long id) throws Exception {
        UserSettings userSettings = userSettingsService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(userSettings, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete User Settings by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUserSettings(@PathVariable Long id) throws Exception {
        userSettingsService.deleteById(id);
        return new ResponseEntity<>("User Settings were deleted", HttpStatus.OK);
    }
}


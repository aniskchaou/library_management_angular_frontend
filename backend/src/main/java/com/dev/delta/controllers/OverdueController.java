package com.dev.delta.controllers;
import com.dev.delta.entities.Overdue;
import com.dev.delta.services.OverdueService;
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
@RequestMapping("overdue")
@CrossOrigin(origins = "*")
@Api(value = "OverdueController", description = "Controller for Overdue Records")
public class OverdueController {

    @Autowired
    private OverdueService overdueService;

    @ApiOperation(value = "Add Overdue Record")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addOverdue(@Validated @RequestBody Overdue overdue, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Overdue newOverdue = overdueService.save(overdue);
        return new ResponseEntity<>(newOverdue, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Overdue Records")
    @GetMapping("/all")
    public Iterable<Overdue> getAllOverdues() {
        return overdueService.findAll();
    }

    @ApiOperation(value = "Get Overdue Record by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Overdue> getOverdueById(@PathVariable Long id) throws Exception {
        Overdue overdue = overdueService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(overdue, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Overdue Record by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOverdue(@PathVariable Long id) throws Exception {
        overdueService.deleteById(id);
        return new ResponseEntity<>("Overdue Record was deleted", HttpStatus.OK);
    }
}


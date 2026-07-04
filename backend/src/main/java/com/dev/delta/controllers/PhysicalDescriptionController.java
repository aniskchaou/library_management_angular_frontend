package com.dev.delta.controllers;
import com.dev.delta.entities.PhysicalDescription;
import com.dev.delta.services.PhysicalDescriptionService;
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
@RequestMapping("physicalDescription")
@CrossOrigin(origins = "*")
@Api(value = "PhysicalDescriptionController", description = "Controller for Physical Descriptions")
public class PhysicalDescriptionController {

    @Autowired
    private PhysicalDescriptionService physicalDescriptionService;

    @ApiOperation(value = "Add Physical Description")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addPhysicalDescription(@Validated @RequestBody PhysicalDescription physicalDescription, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        PhysicalDescription newDescription = physicalDescriptionService.save(physicalDescription);
        return new ResponseEntity<>(newDescription, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Physical Descriptions")
    @GetMapping("/all")
    public Iterable<PhysicalDescription> getAllPhysicalDescriptions() {
        return physicalDescriptionService.findAll();
    }

    @ApiOperation(value = "Get Physical Description by ID")
    @GetMapping("/{id}")
    public ResponseEntity<PhysicalDescription> getPhysicalDescriptionById(@PathVariable Long id) throws Exception {
        PhysicalDescription physicalDescription = physicalDescriptionService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(physicalDescription, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Physical Description by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePhysicalDescription(@PathVariable Long id) throws Exception {
        physicalDescriptionService.deleteById(id);
        return new ResponseEntity<>("Physical Description was deleted", HttpStatus.OK);
    }
}


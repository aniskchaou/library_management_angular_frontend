package com.dev.delta.controllers;
import com.dev.delta.entities.Departement;
import com.dev.delta.services.DepartmentService;
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
@RequestMapping("department")
@CrossOrigin(origins = "*")
@Api(value = "DepartmentController", description = "Controller for Departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @ApiOperation(value = "Add Department")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addDepartment(@Validated @RequestBody Departement department, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Departement newDepartment = departmentService.save(department);
        return new ResponseEntity<>(newDepartment, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Departments")
    @GetMapping("/all")
    public Iterable<Departement> getAllDepartments() {
        return departmentService.findAll();
    }

    @ApiOperation(value = "Get Department by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Departement> getDepartmentById(@PathVariable Long id) throws Exception {
        Departement department = departmentService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(department, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Department by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long id) throws Exception {
        departmentService.deleteById(id);
        return new ResponseEntity<>("Department was deleted", HttpStatus.OK);
    }
}

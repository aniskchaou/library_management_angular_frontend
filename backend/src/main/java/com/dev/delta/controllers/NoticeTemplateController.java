package com.dev.delta.controllers;

import com.dev.delta.entities.NoticeTemplate;
import com.dev.delta.services.NoticeTemplateService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/noticetemplate")
@CrossOrigin(origins = "*")
@Api(value = "NoticeTemplateController", description = "Controller for Notice Templates")
public class NoticeTemplateController {

    @Autowired
    private NoticeTemplateService noticeTemplateService;

    @ApiOperation(value = "Add Notice Template")
    @PostMapping("/create")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Notice Template created successfully"),
            @ApiResponse(code = 400, message = "Invalid input")
    })
    public ResponseEntity<?> addNoticeTemplate( @RequestBody NoticeTemplate noticeTemplate, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        NoticeTemplate newNoticeTemplate = noticeTemplateService.save(noticeTemplate);
        return new ResponseEntity<>(newNoticeTemplate, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Notice Templates")
    @GetMapping("/all")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success")
    })
    public ResponseEntity<Iterable<NoticeTemplate>> getAllNoticeTemplates() {
        Iterable<NoticeTemplate> noticeTemplates = noticeTemplateService.findAll();
        return new ResponseEntity<>(noticeTemplates, HttpStatus.OK);
    }

    @ApiOperation(value = "Get Notice Template by ID")
    @GetMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Notice Template not found")
    })
    public ResponseEntity<NoticeTemplate> getNoticeTemplateById(@PathVariable Long id) throws Exception {
        NoticeTemplate noticeTemplate = noticeTemplateService.findById(id).orElseThrow(() -> new Exception("Notice Template not found with id " + id));
        return new ResponseEntity<>(noticeTemplate, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Notice Template by ID")
    @DeleteMapping("/delete/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Notice Template deleted successfully"),
            @ApiResponse(code = 404, message = "Notice Template not found")
    })
    public ResponseEntity<String> deleteNoticeTemplate(@PathVariable Long id) throws Exception {
        noticeTemplateService.deleteById(id);
        return new ResponseEntity<>("Notice Template was deleted", HttpStatus.OK);
    }
}

package com.dev.delta.controllers;

import com.dev.delta.dto.NoticeRequest;
import com.dev.delta.entities.Notice;
import com.dev.delta.services.NoticeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/notice")
@CrossOrigin(origins = "*")
@Api(value = "NoticeController", description = "Controller for Notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @ApiOperation(value = "Add Notice")
    @PostMapping("/create")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Notice created successfully"),
            @ApiResponse(code = 400, message = "Invalid input")
    })
    public ResponseEntity<?> addNotice( @RequestBody Notice notice, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Notice newNotice = noticeService.save(notice);
        return new ResponseEntity<>(newNotice, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Notices")
    @GetMapping("/all")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success")
    })
    public ResponseEntity<Iterable<Notice>> getAllNotices() {
        Iterable<Notice> notices = noticeService.findAll();
        return new ResponseEntity<>(notices, HttpStatus.OK);
    }

    @ApiOperation(value = "Get Notice by ID")
    @GetMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Notice not found")
    })
    public ResponseEntity<Notice> getNoticeById(@PathVariable Long id) throws Exception {
        Notice notice = noticeService.findById(id).orElseThrow(() -> new Exception("Notice not found with id " + id));
        return new ResponseEntity<>(notice, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Notice by ID")
    @DeleteMapping("/delete/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Notice deleted successfully"),
            @ApiResponse(code = 404, message = "Notice not found")
    })
    public ResponseEntity<String> deleteNotice(@PathVariable Long id) throws Exception {
        noticeService.deleteById(id);
        return new ResponseEntity<>("Notice was deleted", HttpStatus.OK);
    }


    @Autowired
    private JavaMailSender mailSender;


    @PostMapping("/send")
    public ResponseEntity<String> sendNotice(@RequestBody NoticeRequest noticeRequest) {
        sendSimpleEmail(noticeRequest.getToEmail(), noticeRequest.getSubject(), noticeRequest.getBody());
        System.out.println("Email sent successfully!");
        return new ResponseEntity<>("Email sent successfully!", HttpStatus.OK);
    }

    @Value("${spring.mail.username}")
    private String from;

    public void sendSimpleEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    @PostMapping("/send-sms")
    public String sendSms(@RequestBody NoticeRequest noticeRequest) {
        return noticeService.sendSms(noticeRequest.getToEmail(), noticeRequest.getBody());
    }

    @GetMapping("/{id}/importance/high")
    public ResponseEntity<Notice> updateImportanceToHigh(@PathVariable Long id) {
        Notice updatedNotice = noticeService.setImportanceToHigh(id);
        return ResponseEntity.ok(updatedNotice);
    }

}

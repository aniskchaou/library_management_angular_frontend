package com.dev.delta.controllers;

import com.dev.delta.dto.ChartData;
import com.dev.delta.entities.MediaType;
import com.dev.delta.services.MediaTypeService;
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
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("mediatype")
@CrossOrigin(origins = "*")
@Api(value = "MediaTypeController", description = "Controller for Media Types")
public class MediaTypeController {

    @Autowired
    private MediaTypeService mediaTypeService;

    @ApiOperation(value = "Add Media Type")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addMediaType(@Validated @RequestBody MediaType mediaType, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        MediaType newMediaType = mediaTypeService.saveOrUpdate(mediaType);
        return new ResponseEntity<>(newMediaType, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Media Types")
    @GetMapping("/all")
    public Iterable<MediaType> getAllMediaTypes() {
        return mediaTypeService.findAll();
    }

    @ApiOperation(value = "Get Media Type by ID")
    @GetMapping("/{id}")
    public ResponseEntity<MediaType> getMediaTypeById(@PathVariable Long id) throws Exception {
        MediaType mediaType = mediaTypeService.findById(id).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(mediaType, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Media Type by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMediaType(@PathVariable Long id) throws Exception {
        mediaTypeService.delete(id);
        return new ResponseEntity<>("Media Type was deleted", HttpStatus.OK);
    }

    // Endpoint to get number of media items by type
    @GetMapping("/items-by-type")
    public List<ChartData> getMediaItemsByType() {
        return mediaTypeService.getMediaItemsByType();
    }

    // Endpoint to get media distribution by genre
    @GetMapping("/distribution-by-genre")
    public List<ChartData> getMediaDistributionByGenre() {
        return mediaTypeService.getMediaDistributionByGenre();
    }

    // Endpoint to get media acquisition trends over time
    @GetMapping("/acquisition-trends")
    public List<ChartData> getMediaAcquisitionTrends() {
        return mediaTypeService.getMediaAcquisitionTrends();
    }

    // Endpoint to get top media types by borrow count
    @GetMapping("/top-media-by-borrow")
    public List<ChartData> getTopMediaTypesByBorrowCount() {
        return mediaTypeService.getTopMediaTypesByBorrowCount();
    }
}


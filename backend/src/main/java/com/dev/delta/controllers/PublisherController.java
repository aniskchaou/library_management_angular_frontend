package com.dev.delta.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.delta.entities.Publisher;
import com.dev.delta.services.PublisherService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("publisher")
@CrossOrigin(origins = "*")
@Api(value = "BookController", description = " this is the publisher controller class")
/**
 * 
 * @author Admin
 *
 */
public class PublisherController {

	/**
	 * 
	 */
	@Autowired
	PublisherService publisherService;

	/**
	 * 
	 * @param projectPublisher
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " add publisher ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addPublisher(@Validated @RequestBody Publisher projectPublisher, BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}

		Publisher newPT = publisherService.saveOrUpdate(projectPublisher);

		return new ResponseEntity<Publisher>(newPT, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @return
	 */
	@ApiOperation(value = " get all publishers ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<Publisher> getAllPublishers() {
		return publisherService.findAll();
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " get publisher ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<Publisher> getPublisherById(@PathVariable Long id) throws Exception {
		Publisher publisher = publisherService.findById(id);
		return new ResponseEntity<Publisher>(publisher, HttpStatus.OK);
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " delete publisher ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deletePublisher(@PathVariable Long id) throws Exception {
		publisherService.delete(id);
		return new ResponseEntity<String>("publisher was deleted", HttpStatus.OK);
	}
}

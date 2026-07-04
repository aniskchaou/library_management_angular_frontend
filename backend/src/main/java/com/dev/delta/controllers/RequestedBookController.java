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

import com.dev.delta.entities.RequestedBook;
import com.dev.delta.services.RequestedBookService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("requestedbook")
@CrossOrigin(origins = "*")
@Api(value = "BookController", description = " this is the requested book controller class")
/**
 * 
 * @author Admin
 *
 */
public class RequestedBookController {

	/**
	 * 
	 */
	@Autowired
	RequestedBookService requestedBookService;

	/**
	 * 
	 * @param projectRequestedBook
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " add requested book ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addRequestedBook(@Validated @RequestBody RequestedBook projectRequestedBook,
			BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		projectRequestedBook.setStatus("Pending");
		RequestedBook newPT = requestedBookService.saveOrUpdate(projectRequestedBook);

		return new ResponseEntity<RequestedBook>(newPT, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @return
	 */
	@ApiOperation(value = " get all requested book ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<RequestedBook> getAllRequestedBooks() {
		return requestedBookService.findAll();
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " get requested book by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<RequestedBook> getRequestedBookById(@PathVariable Long id) throws Exception {
		RequestedBook requestedBook = requestedBookService.findById(id);
		return new ResponseEntity<RequestedBook>(requestedBook, HttpStatus.OK);
	}

	@ApiOperation(value = " get requested book by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/resolve/{id}")
	public ResponseEntity<Void> resolveBook(@PathVariable int id) throws Exception {
		requestedBookService.resolve(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@ApiOperation(value = " get requested book by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/reject/{id}")
	public ResponseEntity<Void> rejectBook(@PathVariable int id) throws Exception {
		System.out.println(id);
		requestedBookService.reject(id);

		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " delete requested book ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteRequestedBook(@PathVariable Long id) throws Exception {
		requestedBookService.delete(id);
		return new ResponseEntity<String>("requestedBook was deleted", HttpStatus.OK);
	}
}

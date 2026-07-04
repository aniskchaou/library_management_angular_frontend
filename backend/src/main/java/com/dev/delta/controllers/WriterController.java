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

import com.dev.delta.entities.Writer;
import com.dev.delta.services.WriterService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * WriterController
 * 
 * @author Admin
 *
 */
@RestController
@RequestMapping("writer")
@CrossOrigin(origins = "*")
@Api(value = "WriterController", description = " this is the writer controller class")
public class WriterController {
	/**
	 * writerService
	 */
	@Autowired
	WriterService writerService;

	/**
	 * addWriter
	 * 
	 * @param projectWriter
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " add writer ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addWriter(@Validated @RequestBody Writer projectWriter, BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}

		Writer newPT = writerService.saveOrUpdate(projectWriter);
		return new ResponseEntity<Writer>(newPT, HttpStatus.CREATED);
	}

	/**
	 * getAllWriters
	 * 
	 * @return
	 */
	@ApiOperation(value = " get writers ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<Writer> getAllWriters() {
		return writerService.findAll();
	}

	/**
	 * getWriterById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " get writer by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<Writer> getWriterById(@PathVariable Long id) throws Exception {
		Writer writer = writerService.findById(id);
		return new ResponseEntity<Writer>(writer, HttpStatus.OK);
	}

	/**
	 * deleteWriter
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " delete writer ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteWriter(@PathVariable Long id) throws Exception {
		writerService.delete(id);
		return new ResponseEntity<String>("writer was deleted", HttpStatus.OK);
	}
}

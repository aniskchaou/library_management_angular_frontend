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

import com.dev.delta.entities.CirculationStatus;
import com.dev.delta.services.CirculationStatusService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("circulationstatus")
@CrossOrigin(origins = "*")
@Api(value = "BookController", description = " this is the circulation status controller class")
/**
 * circulation status controller
 * 
 * @author Admin
 *
 */
public class CirculationStatusController {

	/**
	 * 
	 */
	@Autowired
	CirculationStatusService circulationStatusService;

	/**
	 * 
	 * @param projectCirculationStatus
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " add circulation status ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addCIrculationStatus(@Validated @RequestBody CirculationStatus projectCirculationStatus,
			BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}

		CirculationStatus newPT = circulationStatusService.saveOrUpdate(projectCirculationStatus);

		return new ResponseEntity<CirculationStatus>(newPT, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @return
	 */
	@ApiOperation(value = " get circulation status ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<CirculationStatus> getAllCirculationStatuss() {
		return circulationStatusService.findAll();
	}

	/**
	 * get circulation status by id
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " find circulation status by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<CirculationStatus> getCirculationStatusById(@PathVariable Long id) throws Exception {
		CirculationStatus circulationStatus = circulationStatusService.findById(id);
		return new ResponseEntity<CirculationStatus>(circulationStatus, HttpStatus.OK);
	}

	/**
	 * delete circulation
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " delete circulation by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteCirculationStatus(@PathVariable Long id) throws Exception {
		circulationStatusService.delete(id);
		return new ResponseEntity<String>("circulationStatus was deleted", HttpStatus.OK);
	}
}

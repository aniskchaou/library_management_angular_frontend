package com.dev.delta.controllers;

import java.util.HashMap;
import java.util.List;
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

import com.dev.delta.entities.Income;
import com.dev.delta.repositories.IncomeRepository;
import com.dev.delta.services.IncomeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("income")
@CrossOrigin(origins = "*")
@Api(value = "IncomeController", description = " this is the income controller class")
public class IncomeController {
	/**
	 * 
	 */
	@Autowired
	IncomeService incomeService;

	@Autowired
	IncomeRepository incomeRepository;

	/**
	 * 
	 * @param income
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " create member ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addPTToBoard(@Validated @RequestBody Income income, BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}

		Income newPT = incomeService.saveOrUpdate(income);

		return new ResponseEntity<Income>(newPT, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @return
	 */
	@ApiOperation(value = " get all icomes ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public List<Income> getAll() {
		return incomeRepository.findAll();
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " show payment ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<Income> getByID(@PathVariable Long id) throws Exception {
		Income member = incomeService.findById(id);
		return new ResponseEntity<Income>(member, HttpStatus.OK);
	}

	/**
	 * delete member
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " delete payment by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {
		incomeService.delete(id);
		return new ResponseEntity<String>("member was deleted", HttpStatus.OK);
	}

}

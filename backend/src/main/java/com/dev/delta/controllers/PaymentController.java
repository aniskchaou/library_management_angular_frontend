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

import com.dev.delta.entities.Payment;
import com.dev.delta.services.PaymentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("payment")
@CrossOrigin(origins = "*")
@Api(value = "PaymentController", description = " this is the payment controller class")
public class PaymentController {
	/**
	 * 
	 */
	@Autowired
	PaymentService paymentService;

	/**
	 * 
	 * @param projectMember
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " create payment ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addPTToBoard(@Validated @RequestBody Payment payment, BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}

		Payment newPT = paymentService.saveOrUpdate(payment);

		return new ResponseEntity<Payment>(newPT, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @return
	 */
	@ApiOperation(value = " get all payments ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<Payment> getAllPayments() {
		return paymentService.findAll();
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
	public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) throws Exception {
		Payment member = paymentService.findById(id);
		return new ResponseEntity<Payment>(member, HttpStatus.OK);
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
		paymentService.delete(id);
		return new ResponseEntity<String>("member was deleted", HttpStatus.OK);
	}

}

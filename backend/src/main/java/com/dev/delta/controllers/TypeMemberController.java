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

import com.dev.delta.entities.MemberType;
import com.dev.delta.services.TypeMemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("typemember")
@CrossOrigin(origins = "*")
@Api(value = "BookController", description = " this is the typemember controller class")
/**
 * 
 * @author Admin
 *
 */
public class TypeMemberController {
	/**
	 * 
	 */
	@Autowired
	TypeMemberService typeMemberService;

	/**
	 * 
	 * @param projectMemberType
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " add type member ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addtypeMember(@Validated @RequestBody MemberType projectMemberType, BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}

		MemberType newPT = typeMemberService.saveOrUpdate(projectMemberType);

		return new ResponseEntity<MemberType>(newPT, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @return
	 */
	@ApiOperation(value = " get type members ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<MemberType> getAllTypeMembers() {
		return typeMemberService.findAll();
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " get member type by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<MemberType> getTypeMemberById(@PathVariable Long id) throws Exception {
		MemberType memberType = typeMemberService.findById(id);
		return new ResponseEntity<MemberType>(memberType, HttpStatus.OK);
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " rdeete type member ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteTypeMember(@PathVariable Long id) throws Exception {
		typeMemberService.delete(id);
		return new ResponseEntity<String>("typeMember was deleted", HttpStatus.OK);
	}
}

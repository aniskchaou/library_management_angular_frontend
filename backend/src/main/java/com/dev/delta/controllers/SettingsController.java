package com.dev.delta.controllers;

import java.util.HashMap;
import java.util.Map;

import com.dev.delta.entities.UserSetting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.delta.entities.Settings;
import com.dev.delta.services.SettingsService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("settings")
@CrossOrigin(origins = "*")
@Api(value = "BookController", description = " this is the settings controller class")
/**
 * 
 * @author Admin
 *
 */
public class SettingsController {

	/**
	 * 
	 */
	@Autowired
	SettingsService settingsService;



	@PostMapping("/save_user_settings")
	public UserSetting saveSettings(@RequestBody UserSetting settings) {
		return settingsService.saveSettings(settings);
	}

	// Get settings by id (GET)
	@GetMapping("/user_settings/{id}")
	public UserSetting getSettings(@PathVariable Long id) {
		return settingsService.getSettings(id);
	}

	/**
	 * 
	 * @param settings
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " create settings ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addSettings(@Validated @RequestBody Settings settings, BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}

		Settings newPT = settingsService.saveOrUpdate(settings);

		return new ResponseEntity<Settings>(newPT, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @return
	 */
	@ApiOperation(value = " get all settings ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<Settings> getAllSettings() {
		return settingsService.findAll();
	}

	/**
	 * 
	 * @param lang
	 */
	@ApiOperation(value = " update lang ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/updatelang/{lang}")
	public void getAllSettings(@PathVariable("lang") String lang) {
		settingsService.changeLang(lang);
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " get settings ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<Settings> getSettingsById(@PathVariable Long id) throws Exception {
		Settings settings = settingsService.findById(id);
		return new ResponseEntity<Settings>(settings, HttpStatus.OK);
	}

}

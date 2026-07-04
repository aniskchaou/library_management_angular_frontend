package com.dev.delta.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("email")
@CrossOrigin(origins = "*")
public class EmailController {

	@Autowired
	EmailService emailService;

	@Autowired
	EmailSettingRepository emailSettingRepository;

	@GetMapping(value = "/sendemail/{body}/{subject}/{receiver}")
	public ResponseEntity<?> sendEmail(@PathVariable String body, @PathVariable String subject,
			@PathVariable String receiver) throws Exception {
		long id = 1L;
		EmailSetting emailSetting = emailSettingRepository.getById(id);

		emailService.sendmail(emailSetting.getAuth(), emailSetting.getEnableTLS(), emailSetting.getHost(),
				emailSetting.getPort(), emailSetting.getEmail(), receiver, emailSetting.getPassword(), body, subject);

		return new ResponseEntity<String>("\"Email sent successfully\"", HttpStatus.OK);
	}

	@ApiOperation(value = " get settings ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<EmailSetting> getSettingsById(@PathVariable Long id) throws Exception {
		EmailSetting settings = emailService.findEmailSettings(id);
		return new ResponseEntity<EmailSetting>(settings, HttpStatus.OK);
	}
}

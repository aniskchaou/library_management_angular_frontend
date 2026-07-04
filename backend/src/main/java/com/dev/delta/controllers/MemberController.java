package com.dev.delta.controllers;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

import com.dev.delta.dto.output.MemberStatisticsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.dev.delta.entities.Member;
import com.dev.delta.services.MemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("member")
@CrossOrigin(origins = "*")
@Api(value = "BookController", description = " this is the member controller class")
/**
 * 
 * @author Admin
 *
 */
public class MemberController {
	/**
	 * 
	 */
	@Autowired
	MemberService memberService;

	/**
	 * 
	 * @param projectMember
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " create member ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addPTToBoard(@Validated @RequestBody Member projectMember, BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		projectMember.setUserType("Normal");
		Member newPT = memberService.saveOrUpdate(projectMember);

		return new ResponseEntity<Member>(newPT, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @return
	 */
	@ApiOperation(value = " get all members ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<Member> getAllMembers() {
		return memberService.findAll();
	}

	@ApiOperation(value = " get all members ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/status")
	public Iterable<String> getStatus() {
		return memberService.findStatus();
	}

	@ApiOperation(value = " get all members ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/usertype")
	public Iterable<String> getusertype() {
		return memberService.findUserType();
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " show member ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<Member> getMemberById(@PathVariable Long id) throws Exception {
		Member member = memberService.findById(id);
		return new ResponseEntity<Member>(member, HttpStatus.OK);
	}

	/**
	 * delete member
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " delete member by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteMember(@PathVariable Long id) throws Exception {
		memberService.delete(id);
		return new ResponseEntity<String>("member was deleted", HttpStatus.OK);
	}

	@ApiOperation(value = " filter book ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/memberreport/{status}/{type_id}")
	public ResponseEntity<List<Member>> filterCirculationByCriteria(@PathVariable String status,
			@PathVariable String type_id) throws Exception {

		List<Member> bookRes = memberService.filterMemberCriteria(status, type_id);
		// System.out.println(bookRes.toString());
		return new ResponseEntity<List<Member>>(bookRes, HttpStatus.OK);

	}

	// Endpoint to get number of members by user type
	@GetMapping("/members-by-user-type")
	public List<Map<String, Object>> getMembersByUserType() {
		return memberService.getMembersByUserType();
	}

	// Endpoint to get gender distribution of members
	@GetMapping("/members-by-gender")
	public List<Map<String, Object>> getMembersByGender() {
		return memberService.getMembersByGender();
	}

	// Endpoint to get age distribution of members
	@GetMapping("/members-by-age")
	public List<Map<String, Object>> getMembersByAge() {
		return memberService.getMembersByAge();
	}

	// Endpoint to get number of members by city
	@GetMapping("/members-by-city")
	public List<Map<String, Object>> getMembersByCity() {
		return memberService.getMembersByCity();
	}

	// Endpoint to get new arrivals
	@GetMapping("/new-arrivals")
	public ResponseEntity<List<Member>> getNewArrivals() {
		List<Member> newArrivals = memberService.getNewArrivals();
		return ResponseEntity.ok(newArrivals);
	}

	// Endpoint to get unverified accounts
	@GetMapping("/unverified")
	public ResponseEntity<List<Member>> getUnverifiedAccounts() {
		List<Member> unverifiedAccounts = memberService.getUnverifiedAccounts();
		return ResponseEntity.ok(unverifiedAccounts);
	}

	// Endpoint to get blocked members
	@GetMapping("/blocked")
	public ResponseEntity<List<Member>> getBlockedMembers() {
		List<Member> blockedMembers = memberService.getBlockedMembers();
		return ResponseEntity.ok(blockedMembers);
	}

	// Endpoint to get expired accounts
	@GetMapping("/expired")
	public ResponseEntity<List<Member>> getExpiredAccounts() {
		List<Member> expiredAccounts = memberService.getExpiredAccounts();
		return ResponseEntity.ok(expiredAccounts);
	}


	private final String UPLOAD_DIR = "uploads/";

	// 20MB
	@PostMapping("/upload/")
	public String handleFileUpload(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			return "No file selected!";
		}

		try {
			// Define the path where the file will be saved
			String uploadDirectory = System.getProperty("user.dir") + "/static/images/users/";
			File directory = new File(uploadDirectory);
			if (!directory.exists()) {
				directory.mkdirs();  // Create directory if it doesn't exist
			}

			// Save the file
			File destinationFile = new File(uploadDirectory + file.getOriginalFilename());
			file.transferTo(destinationFile);

			return "File uploaded successfully: " + file.getOriginalFilename();

		} catch (IOException e) {
			e.printStackTrace();
			return "File upload failed!";
		}
	}

	// Endpoint to reactivate a member
	@GetMapping("/{memberId}/reactivate")
	public ResponseEntity<Member> reactivateMember(@PathVariable Long memberId) {
		Optional<Member> member = memberService.reactivateMember(memberId);
		if (member.isPresent()) {
			return ResponseEntity.ok(member.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Endpoint to block a member
	@GetMapping("/{memberId}/block")
	public ResponseEntity<Member> blockMember(@PathVariable Long memberId) {
		Optional<Member> member = memberService.blockMember(memberId);
		if (member.isPresent()) {
			return ResponseEntity.ok(member.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Endpoint to verify a member
	@GetMapping("/{memberId}/verify")
	public ResponseEntity<Member> verifyMember(@PathVariable Long memberId) {
		Optional<Member> member = memberService.verifyMember(memberId);
		if (member.isPresent()) {
			return ResponseEntity.ok(member.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	@GetMapping("/member-files/{memberId}/{filename}")
	public ResponseEntity<Resource> serveFile(
			@PathVariable("memberId") String memberId,
			@PathVariable("filename") String filename
	) {
		try {
			// Define the directory path and construct the full file path
			String filePath = System.getProperty("user.dir") + "/static/images/member/" + memberId + "/" + filename;
			File file = new File(filePath);

			// Check if the file exists
			if (!file.exists()) {
				return ResponseEntity.notFound().build();
			}

			// Detect the file content type (e.g., image/jpeg or application/pdf)
			String contentType = Files.probeContentType(file.toPath());

			// If content type could not be determined, set it as binary
			if (contentType == null) {
				contentType = "application/octet-stream";
			}

			// Load the file as a resource
			Resource resource = new UrlResource(file.toURI());

			// Return the file content with appropriate content type
			return ResponseEntity.ok()
					.contentType(MediaType.parseMediaType(contentType))
					.body(resource);

		} catch (MalformedURLException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/files/{memberId}")
	public ResponseEntity<List<Map<String, String>>> listFiles(@PathVariable("memberId") String memberId, HttpServletRequest request) {
		// Define the directory path where the files are stored for this memberId
		String directoryPath = System.getProperty("user.dir") + "/static/images/member/" + memberId + "/";
		File directory = new File(directoryPath);

		// List to store the file information (filename and URL)
		List<Map<String, String>> fileList = new ArrayList<>();

		if (directory.exists() && directory.isDirectory()) {
			// Get the list of files
			File[] files = directory.listFiles();

			if (files != null) {
				for (File file : files) {
					if (file.isFile()) {
						// Get the filename
						String filename = file.getName();

						// Create a URL for accessing the file via HTTP
						String fileUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
								+ "/static/images/member/" + memberId + "/" + filename;

						// Create a map with the filename and URL
						Map<String, String> fileInfo = new HashMap<>();
						fileInfo.put("filename", filename);
						//fileInfo.put("url", fileUrl);

						// Add the file info to the list
						fileList.add(fileInfo);
					}
				}
			}
		}

		// Return the list of file information as a JSON response
		return ResponseEntity.ok(fileList);
	}

	@PostMapping("/upload")
	public String handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("memberId") String memberId) {
		if (file.isEmpty()) {
			return "No file selected!";
		}

		try {
			// Define the path where the file will be saved with memberId
			String uploadDirectory = System.getProperty("user.dir") + "/static/images/member/" + memberId + "/";
			File directory = new File(uploadDirectory);

			// Create the directory for the memberId if it doesn't exist
			if (!directory.exists()) {
				directory.mkdirs();  // Create directory
			}

			// Save the file in the vendor-specific directory
			File destinationFile = new File(uploadDirectory + file.getOriginalFilename());
			file.transferTo(destinationFile);

			return "File uploaded successfully: " + file.getOriginalFilename();

		} catch (IOException e) {
			e.printStackTrace();
			return "File upload failed!";
		}
	}



}

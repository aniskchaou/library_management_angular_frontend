package com.dev.delta.controllers;

import java.util.HashMap;
import java.util.Map;

import com.dev.delta.dto.OpenAIProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.dev.delta.entities.Category;
import com.dev.delta.services.CategoryBookService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("category")
@CrossOrigin(origins = "*")
@Api(value = "BookController", description = " this is the category book controller class")
/**
 * Category Controller
 * 
 * @author Admin
 *
 */
public class CategoryBookController {
	/**
	 * CategoryBookService
	 */
	@Autowired
	CategoryBookService categoryService;

	private OpenAIProperties openAIProperties;

	/**
	 * addCategory
	 * 
	 * @param projectCategory
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " add category ")
	@PostMapping("/create")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	public ResponseEntity<?> addCategory(@Validated @RequestBody Category projectCategory, BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}

		Category newPT = categoryService.saveOrUpdate(projectCategory);

		return new ResponseEntity<Category>(newPT, HttpStatus.CREATED);
	}

	/**
	 * getAllCategorys
	 * 
	 * @return
	 */
	@ApiOperation(value = " find categories ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<Category> getAllCategorys() {
		return categoryService.findAll();
	}

	/**
	 * getCategoryById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " get category by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable Long id) throws Exception {
		Category category = categoryService.findById(id);
		return new ResponseEntity<Category>(category, HttpStatus.OK);
	}

	/**
	 * deleteCategory
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " rdelete by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteCategory(@PathVariable Long id) throws Exception {
		categoryService.delete(id);
		return new ResponseEntity<String>("category was deleted", HttpStatus.OK);
	}




	@GetMapping(value = "/suggestions", produces = "application/json")
	public ResponseEntity<String> getCategorySuggestions() {
		return getChatGptSuggestions();
	}

	/*@Value("${openai.api.key}")
	private String openaiApiKey;*/

	// Logic to interact with ChatGPT or any other system
	private ResponseEntity<String> getChatGptSuggestions() {
		// OpenAI API URL
		String apiUrl = "https://api.openai.com/v1/chat/completions";

		// Prepare headers
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + openAIProperties.getApiKey());
		headers.set("Content-Type", "application/json");

		// Define the request body for OpenAI
		String requestBody = "{\n" +
				"    \"model\": \"gpt-3.5-turbo\",\n" +
				"    \"messages\": [\n" +
				"        {\"role\": \"system\", \"content\": \"You are a helpful assistant.\"},\n" +
				"        {\"role\": \"user\", \"content\": \"Generate category name and slug for a book genre.\"}\n" +
				"    ],\n" +
				"    \"max_tokens\": 50,\n" +
				"    \"temperature\": 0.7,\n" +
				"    \"top_p\": 1,\n" +
				"    \"n\": 1,\n" +
				"    \"stream\": false\n" +
				"}\n";

		// Prepare the entity with headers and body
		HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

		// Use RestTemplate to make the API call
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

		return response;
	}

	// Endpoint to get total category count
	@GetMapping("/count")
	public ResponseEntity<Long> getTotalCategoryCount() {
		long count = categoryService.getTotalCategoryCount();
		return ResponseEntity.ok(count);
	}

	// Endpoint to get published and unpublished counts
	@GetMapping("/status-count")
	public ResponseEntity<Map<String, Long>> getPublishedUnpublishedCount() {
		Map<String, Long> countMap = categoryService.getPublishedUnpublishedCount();
		return ResponseEntity.ok(countMap);
	}

	// Endpoint to get category distribution
	@GetMapping("/distribution")
	public ResponseEntity<Map<String, Long>> getCategoryDistribution() {
		Map<String, Long> distribution = categoryService.getCategoryDistribution();
		return ResponseEntity.ok(distribution);
	}

	@GetMapping("/{id}/publish")
	public ResponseEntity<Category> setCategoryPublished(@PathVariable Long id) {
		Category updatedCategory = categoryService.setCategoryPublished(id, true);
		return ResponseEntity.ok(updatedCategory);
	}

}

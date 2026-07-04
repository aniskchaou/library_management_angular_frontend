package com.dev.delta.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.dev.delta.dto.ChartData;
import com.dev.delta.dto.output.MemberStatisticsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.dev.delta.entities.Circulation;
import com.dev.delta.services.CirculationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("circulation")
@CrossOrigin(origins = "*")
@Api(value = "BookController", description = " this is the circulation controller class")
/**
 * circulation controller
 * 
 * @author Admin
 *
 */
public class CirculationController {

	/**
	 * circulation service
	 */
	@Autowired
	CirculationService circulationService;

	/**
	 * 
	 * @param projectCirculation
	 * @param result
	 * @return
	 */
	@ApiOperation(value = " add circulation ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@PostMapping("/create")
	public ResponseEntity<?> addCirculation(@Validated @RequestBody Circulation projectCirculation,
			BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<String, String>();

			for (FieldError error : result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}

		Circulation newPT = circulationService.saveOrUpdate(projectCirculation);

		return new ResponseEntity<Circulation>(newPT, HttpStatus.CREATED);
	}

	/**
	 * get circulations
	 * 
	 * @return
	 */
	@ApiOperation(value = " find all circulations ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/all")
	public Iterable<Circulation> getAllCirculations() {
		return circulationService.findAll();
	}
	
	

	@ApiOperation(value = " find all circulations ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/return/{id}")
	public ResponseEntity<Void> returnStatus(@PathVariable int id) {
		circulationService.returnBook(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	
	
	@ApiOperation(value = " find all circulations ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/returnedbook")
	public Iterable<Circulation> getReturnedBook() throws Exception {
		return circulationService.findReturnedBook();
	}

	/**
	 * get circulation
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " find by id ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/{id}")
	public ResponseEntity<Circulation> getCirculationById(@PathVariable Long id) throws Exception {
		Circulation circulation = circulationService.findById(id);
		return new ResponseEntity<Circulation>(circulation, HttpStatus.OK);
	}

	/**
	 * delete circulation
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@ApiOperation(value = " delete ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteCirculation(@PathVariable Long id) throws Exception {
		circulationService.delete(id);
		return new ResponseEntity<String>("circulation was deleted", HttpStatus.OK);
	}

	
	
	@ApiOperation(value = " filter book ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping("/circulationreport/{member_id}/{category_id}/{book_id}")
	public ResponseEntity<List<Circulation>> filterCirculationByCriteria(@PathVariable int member_id,
			@PathVariable int book_id, @PathVariable int category_id) throws Exception {

		List<Circulation> bookRes = circulationService.filterCirculationCriteria(member_id, book_id, category_id);
		// System.out.println(bookRes.toString());
		return new ResponseEntity<List<Circulation>>(bookRes, HttpStatus.OK);

	}

	@GetMapping("/today")
	public ResponseEntity<List<Circulation>> getOverdueItemsForToday() {
		List<Circulation> overdueItems = circulationService.getOverdueItemsForToday();
		return new ResponseEntity<>(overdueItems, HttpStatus.OK);
	}

	@GetMapping("/yesterday")
	public ResponseEntity<List<Circulation>> getOverdueItemsForYesterday() {
		List<Circulation> overdueItems = circulationService.getOverdueItemsForYesterday();
		return new ResponseEntity<>(overdueItems, HttpStatus.OK);
	}

	@GetMapping("/tomorrow")
	public ResponseEntity<List<Circulation>> getOverdueItemsForTomorrow() {
		List<Circulation> overdueItems = circulationService.getOverdueItemsForTomorrow();
		return new ResponseEntity<>(overdueItems, HttpStatus.OK);
	}

	@GetMapping("/soon")
	public ResponseEntity<List<Circulation>> getOverdueItemsForSoon() {
		List<Circulation> overdueItems = circulationService.getOverdueItemsForSoon();
		return new ResponseEntity<>(overdueItems, HttpStatus.OK);
	}

	@GetMapping("/overdue")
	public ResponseEntity<List<Circulation>> getOverdueItemsForAll() {
		List<Circulation> overdueItems = circulationService.getOverdueItemsForAll();
		return new ResponseEntity<>(overdueItems, HttpStatus.OK);
	}

	@GetMapping("/checkin")
	public List<Circulation> getCheckinBooks() {
		return circulationService.getCheckinBooks();
	}

	@GetMapping("/checkout")
	public List<Circulation> getCheckoutBooks() {
		return circulationService.getCheckoutBooks();
	}

	@GetMapping("/onhold")
	public List<Circulation> getOnHoldBooks() {
		return circulationService.getOnHoldBooks();
	}

	@GetMapping("/renew")
	public List<Circulation> getRenewBooks() {
		return circulationService.getRenewBooks();
	}

	@PutMapping("/update-status")
	public ResponseEntity<String> updateCirculationStatus(
			@RequestParam String catalogItemId,
			@RequestParam String memberId,
			@RequestParam String statusName) {

		boolean success = circulationService.updateCirculationStatus(Long.parseLong(catalogItemId) ,Long.parseLong(memberId)  , statusName);

		if (success) {
			return ResponseEntity.ok("Circulation status updated successfully.");
		} else {
			return ResponseEntity.badRequest().body("Failed to update circulation status. Please check the input.");
		}
	}

	// Endpoint to get circulations by member type
	@GetMapping("/member-type")
	public ResponseEntity<List<ChartData>> getCirculationsByMemberType() {
		List<ChartData> data = circulationService.getCirculationsByMemberType();
		return ResponseEntity.ok(data);
	}

	// Endpoint to get borrowed items by category
	@GetMapping("/borrowed-items-category")
	public ResponseEntity<List<ChartData>> getBorrowedItemsByCategory() {
		List<ChartData> data = circulationService.getBorrowedItemsByCategory();
		return ResponseEntity.ok(data);
	}

	// Endpoint to get total penalties collected
	@GetMapping("/total-penalties")
	public ResponseEntity<Double> getTotalPenalties() {
		Double totalPenalties = circulationService.getTotalPenalties();
		return ResponseEntity.ok(totalPenalties);
	}

	// Endpoint to get circulation status distribution
	@GetMapping("/status-distribution")
	public ResponseEntity<List<ChartData>> getCirculationStatusDistribution() {
		List<ChartData> data = circulationService.getCirculationStatusDistribution();
		return ResponseEntity.ok(data);
	}


	@GetMapping(value= "/member-satistics/{memberId}", produces = "application/json")
	public ResponseEntity<MemberStatisticsDTO> getMemberStatistics(@PathVariable Long memberId) {
			// Call the service method that aggregates all statistics
			MemberStatisticsDTO statistics = circulationService.getMemberStatistics(memberId);
		System.err.println(statistics.toString());
		if (statistics == null) {
			return ResponseEntity.notFound().build(); // Return 404 if no statistics found
		}
		return ResponseEntity.ok(statistics);
	}

	// Get circulation details by book ID
	@GetMapping("/book/{bookId}")
	public List<Circulation> getCirculationByBook(@PathVariable Long bookId) {
		return circulationService.getCirculationByBook(bookId);
	}

	// Get circulation details by member ID
	@GetMapping("/member/{memberId}")
	public List<Circulation> getCirculationByMember(@PathVariable Long memberId) {
		return circulationService.getCirculationByMember(memberId);
	}
}

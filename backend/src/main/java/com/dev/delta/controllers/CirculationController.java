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

	// â”€â”€ Top borrowers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
	@GetMapping("/top-borrowers")
	public ResponseEntity<List<Map<String, Object>>> topBorrowers(
			@RequestParam(defaultValue = "10") int limit) {
		Iterable<Circulation> all = circulationService.findAll();
		Map<Long, Long> counts = new java.util.LinkedHashMap<>();
		Map<Long, String> names = new java.util.HashMap<>();
		for (Circulation c : all) {
			if (c.getMemberName() != null) {
				Long mid = c.getMemberName().getId();
				counts.merge(mid, 1L, Long::sum);
				names.put(mid, c.getMemberName().getFirstname() + " " + c.getMemberName().getSurname());
			}
		}
		List<Map<String, Object>> result = counts.entrySet().stream()
				.sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
				.limit(limit)
				.map(e -> {
					Map<String, Object> m = new java.util.HashMap<>();
					m.put("memberId", e.getKey());
					m.put("memberName", names.get(e.getKey()));
					m.put("borrowCount", e.getValue());
					return m;
				})
				.collect(java.util.stream.Collectors.toList());
		return ResponseEntity.ok(result);
	}

	// â”€â”€ Monthly circulation stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
	@GetMapping("/monthly-stats")
	public ResponseEntity<List<Map<String, Object>>> monthlyStats() {
		Iterable<Circulation> all = circulationService.findAll();
		Map<String, Long> monthly = new java.util.TreeMap<>();
		for (Circulation c : all) {
			if (c.getIssueDate() != null && c.getIssueDate().length() >= 7) {
				String month = c.getIssueDate().substring(0, 7); // yyyy-MM
				monthly.merge(month, 1L, Long::sum);
			}
		}
		List<Map<String, Object>> result = monthly.entrySet().stream()
				.map(e -> Map.<String, Object>of("month", e.getKey(), "count", e.getValue()))
				.collect(java.util.stream.Collectors.toList());
		return ResponseEntity.ok(result);
	}

	// â”€â”€ Today's issues â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
	@GetMapping("/today-issues")
	public ResponseEntity<Map<String, Object>> todayIssues() {
		String today = java.time.LocalDate.now().toString();
		long count = 0;
		for (Circulation c : circulationService.findAll()) {
			if (c.getIssueDate() != null && c.getIssueDate().startsWith(today)) count++;
		}
		return ResponseEntity.ok(Map.of("date", today, "todayIssues", count));
	}

	// â”€â”€ Today's returns â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
	@GetMapping("/today-returns")
	public ResponseEntity<Map<String, Object>> todayReturns() {
		String today = java.time.LocalDate.now().toString();
		long count = 0;
		for (Circulation c : circulationService.findAll()) {
			if (c.getReturnDate() != null && c.getReturnDate().startsWith(today)) count++;
		}
		return ResponseEntity.ok(Map.of("date", today, "todayReturns", count));
	}

	// â”€â”€ Export circulation history as CSV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
	@GetMapping("/export/csv")
	public void exportCsv(javax.servlet.http.HttpServletResponse response) throws Exception {
		response.setContentType("text/csv");
		response.setHeader("Content-Disposition", "attachment; filename=\"circulation.csv\"");
		java.io.PrintWriter writer = response.getWriter();
		writer.println("id,memberName,bookTitle,issueDate,dueDate,returnDate,penalty,status");
		for (Circulation c : circulationService.findAll()) {
			writer.printf("%s,%s,%s,%s,%s,%s,%s,%s%n",
					c.getId(),
					c.getMemberName() != null ? c.getMemberName().getFirstname() + " " + c.getMemberName().getSurname() : "",
					c.getCatalogItemName() != null ? c.getCatalogItemName().getTitle() : "",
					c.getIssueDate() != null ? c.getIssueDate() : "",
					c.getToReturn() != null ? c.getToReturn().toString() : "",
					c.getReturnDate() != null ? c.getReturnDate() : "",
					c.getPenalty(),
					c.getReturnStatus() != null ? c.getReturnStatus().getName() : "");
		}
		writer.flush();
	}
	// ── Top borrowed books ───────────────────────────────────────────────────
	@GetMapping("/top-books")
	public ResponseEntity<java.util.List<Map<String, Object>>> topBooks(
		@RequestParam(defaultValue = "10") int limit) {
		java.util.List<Object[]> rows = circulationService.getRepository().findTopBorrowedBooks();
		java.util.List<Map<String, Object>> result = new java.util.ArrayList<>();
		int max = Math.min(limit, rows.size());
		for (int i = 0; i < max; i++) {
			Object[] row = rows.get(i);
			result.add(Map.of("title", row[0] != null ? row[0] : "", "borrowCount", row[1] != null ? row[1] : 0));
		}
		return ResponseEntity.ok(result);
	}

	// ── Active readers count ─────────────────────────────────────────────────
	@GetMapping("/active-readers")
	public ResponseEntity<Map<String, Object>> activeReaders() {
		long count = circulationService.getRepository().countActiveReaders();
		return ResponseEntity.ok(Map.of("activeReaders", count));
	}
}

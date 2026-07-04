package com.dev.delta.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import com.dev.delta.dto.ChartData;
import com.dev.delta.dto.output.MemberStatisticsDTO;
import com.dev.delta.entities.CirculationStatus;
import com.dev.delta.entities.Member;
import com.dev.delta.repositories.CirculationStatusRepository;
import com.dev.delta.repositories.MemberRepository;
import com.dev.delta.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.Circulation;
import com.dev.delta.repositories.CirculationRepository;

import javax.transaction.Transactional;

/**
 * CirculationService
 * 
 * @author Admin
 *
 */
@Service
public class CirculationService {

	/**
	 * CirculationRepository
	 */
	@Autowired
	CirculationRepository circulationRepository;
	@Autowired
	CirculationStatusRepository circulationStatusRepository;

	@Autowired
	PaymentRepository paymentRepository;

	@Autowired
	MemberRepository memberRepository;

	public long count() {

		return circulationRepository.count();
	}

	/**
	 * saveOrUpdate
	 * 
	 * @param circulation
	 * @return
	 */
	public Circulation saveOrUpdate(Circulation circulation) {
		return circulationRepository.save(circulation);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<Circulation> findAll() {
		return circulationRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Circulation findById(Long id) throws Exception {
		return circulationRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		Circulation circulation = findById(id);
		circulationRepository.delete(circulation);
	}

	public Iterable<Circulation> findReturnedBook() throws Exception {
		return circulationRepository.findReturnedBooks();
	}

	public List<Circulation> filterCirculationCriteria(int member_id, int book_id, int category_id) throws Exception {
		return circulationRepository.findBookFilter(member_id, book_id, category_id);
	}

	public void returnBook(int id) {
		circulationRepository.returnBook(id);

	}

	public List<Circulation> getOverdueItemsForToday() {
		LocalDate today = LocalDate.now();
		return circulationRepository.findOverdueItemsForToday(today);
	}

	public List<Circulation> getOverdueItemsForYesterday() {
		LocalDate yesterday = LocalDate.now().minusDays(1);
		return circulationRepository.findOverdueItemsForYesterday(yesterday);
	}

	public List<Circulation> getOverdueItemsForSoon() {
		LocalDate today = LocalDate.now();
		return circulationRepository.findOverdueItemsForSoon(today);
	}

	public List<Circulation> getOverdueItemsForTomorrow() {
		LocalDate tomorrow = LocalDate.now().plusDays(1);
		return circulationRepository.findOverdueItemsForTomorrow(tomorrow);
	}

	public List<Circulation> getOverdueItemsForAll() {
		LocalDate today = LocalDate.now();
		return circulationRepository.findOverdueItemsForAll(today);
	}

	public List<Circulation> getCheckinBooks() {
		return circulationRepository.findCheckinBooks("CheckIn");
	}

	public List<Circulation> getCheckoutBooks() {
		return circulationRepository.findCheckoutBooks("CheckOut");
	}

	public List<Circulation> getOnHoldBooks() {
		return circulationRepository.findOnHoldBooks("On Hold");
	}

	public List<Circulation> getRenewBooks() {
		return circulationRepository.findRenewBooks("Renew");
	}

	@Transactional
	public boolean updateCirculationStatus(Long catalogItemId, Long memberId, String statusName) {
		// Fetch the CirculationStatus based on the status name
		CirculationStatus status = circulationStatusRepository.findByName(statusName);
		System.out.println(status.getName());
		System.out.println(memberId);
		System.out.println(statusName);
		System.out.println(catalogItemId);

		if (status == null) {
			return false; // Status not found, handle appropriately
		}

		int updatedRows = circulationRepository.updateCirculationStatus(status, catalogItemId, memberId);
		return updatedRows > 0; // Return true if update was successful
	}

	// Get circulations by member type
	public List<ChartData> getCirculationsByMemberType() {
		return circulationRepository.findCirculationsByMemberType();
	}

	// Get borrowed items by category
	public List<ChartData> getBorrowedItemsByCategory() {
		return circulationRepository.findBorrowedItemsByCategory();
	}

	// Get total penalties collected
	public Double getTotalPenalties() {
		return circulationRepository.findTotalPenalties();
	}

	// Get circulation status distribution
	public List<ChartData> getCirculationStatusDistribution() {
		return circulationRepository.findCirculationStatusDistribution();
	}

	// Function to fetch total books borrowed
	public int getTotalBooksBorrowed(Long memberId) {
		return circulationRepository.countByMemberName(memberId);
	}

	// Function to fetch currently borrowed books
	public int getCurrentlyBorrowedBooks(Long memberId) {
		return circulationRepository.countByMemberNameAndReturnStatus(memberId, "Not Returned");
	}

	// Function to fetch overdue books
	public int getOverdueBooks(Long memberId) {
		return circulationRepository.countByMemberNameAndToReturnBeforeAndReturnStatus(memberId, LocalDate.now(), "Not Returned");
	}

	// Function to calculate average borrowing rate
	public double getAverageBorrowingRate(Member member) {
		/*int totalBooksBorrowed = getTotalBooksBorrowed(member.getId());
		long monthsActive = ChronoUnit.MONTHS.between(member.getCreatedDate(), LocalDate.now());
		return (double) totalBooksBorrowed / Math.max(1, monthsActive); // Avoid division by zero*/
		int totalBooksBorrowed = getTotalBooksBorrowed(member.getId());

		LocalDate createdDate = member.getCreatedDate();

		// If the created date is null, handle it by either returning a default value or an appropriate error value.
		if (createdDate == null) {
			// You can either throw an exception or return a specific value
			//throw new IllegalArgumentException("Member creation date is null");
			// OR
			 return 0.0; // Returning 0.0 as a fallback if creation date is not available
		}

		long monthsActive = ChronoUnit.MONTHS.between(createdDate, LocalDate.now());
		return (double) totalBooksBorrowed / Math.max(1, monthsActive);
	}

	// Function to fetch favorite genres
	public List<String> getFavoriteGenres(Long memberId) {
		return circulationRepository.findFavoriteGenresByMemberName(memberId);
	}

	// Function to fetch the most borrowed book
	public String getMostBorrowedBook(Long memberId) {
		List<String> mostBorrowedBooks = circulationRepository.findMostBorrowedBookByMemberName(memberId);
		return mostBorrowedBooks.isEmpty() ? null : mostBorrowedBooks.get(0);
		//return circulationRepository.findMostBorrowedBookByMemberName(memberId);
	}

	// Function to calculate total fines accrued
	public BigDecimal getTotalFinesAccrued(Long memberId) {
		return circulationRepository.sumPenaltyByMemberName(memberId);
	}

	// Function to calculate total fines paid
	public BigDecimal getTotalFinesPaid(Long memberId) {
		BigDecimal totalFinesPaid = paymentRepository.sumAmountPaidByMember(memberId);
		return totalFinesPaid != null ? totalFinesPaid : BigDecimal.ZERO;
	}

	// Function to calculate outstanding fines
	public BigDecimal getOutstandingFines(Long memberId) {
		BigDecimal totalFinesAccrued = getTotalFinesAccrued(memberId);
		BigDecimal totalFinesPaid = getTotalFinesPaid(memberId);

		// Ensure that null values are replaced with BigDecimal.ZERO
		if (totalFinesAccrued == null) {
			totalFinesAccrued = BigDecimal.ZERO;
		}
		if (totalFinesPaid == null) {
			totalFinesPaid = BigDecimal.ZERO;
		}
		return totalFinesAccrued.subtract(totalFinesPaid);
	}

	public MemberStatisticsDTO getMemberStatistics(Long memberId) {
		// Fetch the member object
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("Member not found"));

		// Call each statistic function
		int totalBooksBorrowed = getTotalBooksBorrowed(memberId);
		int currentlyBorrowedBooks = getCurrentlyBorrowedBooks(memberId);
		int overdueBooks = getOverdueBooks(memberId);
		double avgBorrowingRate = getAverageBorrowingRate(member);
		List<String> favoriteGenres = getFavoriteGenres(memberId);
		String mostBorrowedBook = getMostBorrowedBook(memberId);
		BigDecimal totalFinesAccrued = getTotalFinesAccrued(memberId);
		BigDecimal totalFinesPaid = getTotalFinesPaid(memberId);
		BigDecimal outstandingFines = getOutstandingFines(memberId);

		// Return the aggregated statistics as a DTO
		return new MemberStatisticsDTO(
				totalBooksBorrowed,
				currentlyBorrowedBooks,
				overdueBooks,
				avgBorrowingRate,
				favoriteGenres,
				mostBorrowedBook,
				totalFinesAccrued,
				totalFinesPaid,
				outstandingFines
		);
	}

	// Fetch circulation by book ID
	public List<Circulation> getCirculationByBook(Long bookId) {
		return circulationRepository.findByCatalogItemName(bookId);
	}

	// Fetch circulation by member ID
	public List<Circulation> getCirculationByMember(Long memberId) {
		return circulationRepository.findByMemberName(memberId);
	}
}

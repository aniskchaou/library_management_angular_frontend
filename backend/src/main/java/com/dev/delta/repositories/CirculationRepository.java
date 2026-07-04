package com.dev.delta.repositories;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import com.dev.delta.dto.ChartData;
import com.dev.delta.entities.CirculationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev.delta.entities.Circulation;

public interface CirculationRepository extends JpaRepository<Circulation, Long> {

	@Query("select count(*) from Circulation c group by c.issueDate")
	List<Integer> findBookByDate();

	@Query("select distinct c.issueDate from Circulation c")
	List<String> findAllCirculations();

	@Query(nativeQuery = true, value = "select * from circulation  where member_id = :member_id and book_id=:book_id  and category_id=:category_id ")
	List<Circulation> findBookFilter(@Param("member_id") int member_id, @Param("book_id") int book_id,
			@Param("category_id") int category_id

	);

	@Query(nativeQuery = true, value ="select distinct c.memberName, c.returnStatus,  c.penalty, c.returnDate, c.bookName, c.writer, c.issueDate, c.toReturn from Circulation c")
	List<Circulation> findReturnedBooks();

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(nativeQuery = true, value = "UPDATE circulation   SET return_status=2 WHERE id=:id ")
	void returnBook(@Param("id") int id);

	@Query("SELECT c FROM Circulation c WHERE  c.toReturn = :today")
	List<Circulation> findOverdueItemsForToday(@Param("today") LocalDate today);

	@Query("SELECT c FROM Circulation c WHERE  c.toReturn = :yesterday")
	List<Circulation> findOverdueItemsForYesterday(@Param("yesterday") LocalDate yesterday);

	@Query("SELECT c FROM Circulation c WHERE  c.toReturn > :today")
	List<Circulation> findOverdueItemsForSoon(@Param("today") LocalDate today);

	@Query("SELECT c FROM Circulation c WHERE  c.toReturn = :tomorrow")
	List<Circulation> findOverdueItemsForTomorrow(@Param("tomorrow") LocalDate tomorrow);

	@Query("SELECT c FROM Circulation c WHERE  c.toReturn < :today")
	List<Circulation> findOverdueItemsForAll(@Param("today") LocalDate today);


	// Custom method for books with 'checkin' status
	@Query("SELECT c FROM Circulation c WHERE c.returnStatus.name = :status")
	List<Circulation> findCheckinBooks(@Param("status") String status);

	// Custom method for books with 'checkout' status
	@Query("SELECT c FROM Circulation c WHERE c.returnStatus.name = :status")
	List<Circulation> findCheckoutBooks(@Param("status") String status);

	// Custom method for books with 'onhold' status
	@Query("SELECT c FROM Circulation c WHERE c.returnStatus.name = :status")
	List<Circulation> findOnHoldBooks(@Param("status") String status);

	// Custom method for books with 'renew' status
	@Query("SELECT c FROM Circulation c WHERE c.returnStatus.name = :status")
	List<Circulation> findRenewBooks(@Param("status") String status);

	@Modifying
	@Transactional
	@Query("UPDATE Circulation c SET c.returnStatus = :status WHERE c.catalogItemName.id = :catalogItemId AND c.memberName.id = :memberId")
	int updateCirculationStatus(@Param("status") CirculationStatus status,
								@Param("catalogItemId") Long catalogItemId,
								@Param("memberId") Long memberId);



	// Chart 1: Number of circulations by member type
	@Query("SELECT new com.dev.delta.dto.ChartData(m.userType, COUNT(c)) " +
			"FROM Circulation c JOIN c.memberName m " +
			"GROUP BY m.userType")
	List<ChartData> findCirculationsByMemberType();


	@Query("SELECT new com.dev.delta.dto.ChartData(c.catalogItemName.category.category_name, COUNT(c)) " +
			"FROM Circulation c " +
			"JOIN c.catalogItemName catalog " +
			"GROUP BY c.catalogItemName.category.category_name")
	List<ChartData> findBorrowedItemsByCategory();


	@Query("SELECT SUM(CAST(c.penalty AS double)) " +
			"FROM Circulation c WHERE c.penalty IS NOT NULL")
	Double findTotalPenalties();


	@Query("SELECT new com.dev.delta.dto.ChartData(s.name, COUNT(c)) " +
			"FROM Circulation c JOIN c.returnStatus s " +
			"GROUP BY s.name")
	List<ChartData> findCirculationStatusDistribution();

	@Query("SELECT c.catalogItemName.title, COUNT(c.catalogItemName) FROM Circulation c GROUP BY c.catalogItemName.title ORDER BY COUNT(c.catalogItemName) DESC")
	List<Object[]> findTopCirculatingBooks();

	// Sum of penalties for a given member by member ID
	@Query("SELECT SUM(c.penalty) FROM Circulation c WHERE c.memberName.id = :memberId")
	BigDecimal sumPenaltyByMemberName(@Param("memberId") Long id);

	// Find the most borrowed book by a member

	@Query("SELECT b.title FROM Circulation c JOIN c.catalogItemName b WHERE c.memberName.id = :memberId GROUP BY b.title ORDER BY COUNT(c.catalogItemName.id) DESC")
	List<String> findMostBorrowedBookByMemberName(@Param("memberId") Long id);

	// Find the favorite genres of a member by counting genres of borrowed books
	@Query("SELECT c.catalogItemName.category.category_name FROM Circulation c WHERE c.memberName.id = :memberId " +
			"GROUP BY c.catalogItemName.category.category_name ORDER BY COUNT(c.catalogItemName.category.category_name) DESC")
	List<String> findFavoriteGenresByMemberName(@Param("memberId") Long id);

	// Count the number of borrowings by member ID
	@Query("SELECT COUNT(c) FROM Circulation c WHERE c.memberName.id = :memberId")
	int countByMemberName(@Param("memberId") Long id);

	// Count the number of borrowings by member ID and return status
	@Query("SELECT COUNT(c) FROM Circulation c WHERE c.memberName.id = :memberId AND c.returnStatus.name = :status")
	int countByMemberNameAndReturnStatus(@Param("memberId") Long id, @Param("status") String notReturned);

	// Count the number of borrowings due before a specific date and not returned
	@Query("SELECT COUNT(c) FROM Circulation c WHERE c.memberName.id = :memberId " +
			"AND c.toReturn < :date AND c.returnStatus.name = :status")
	int countByMemberNameAndToReturnBeforeAndReturnStatus(@Param("memberId") Long id,
														  @Param("date") LocalDate now,
														  @Param("status") String notReturned);


	// Custom JPQL query to find circulation records by book ID
	@Query("SELECT c FROM Circulation c WHERE c.catalogItemName.id = :bookId")
	List<Circulation> findByCatalogItemName(@Param("bookId") Long bookId);

	// Custom JPQL query to find circulation records by member ID
	@Query("SELECT c FROM Circulation c WHERE c.memberName.id = :memberId")
	List<Circulation> findByMemberName(@Param("memberId") Long memberId);

}

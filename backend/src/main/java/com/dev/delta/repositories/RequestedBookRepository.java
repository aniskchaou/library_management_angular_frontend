package com.dev.delta.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev.delta.entities.RequestedBook;

import java.util.Collection;
import java.util.List;

public interface RequestedBookRepository extends JpaRepository<RequestedBook, Long> {

	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = " UPDATE requested_book b SET b.status='Resolved' WHERE b.id= :intValue")
	void resoveRequest(int intValue);

	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "UPDATE requested_book b SET b.status='Rejected' WHERE b.id= :intValue")
	void rejectRequest(int intValue);

	List<RequestedBook> findByCatalogItemIdOrderByQueuePositionAsc(Long catalogItemId);

	List<RequestedBook> findByStatusIn(Collection<String> statuses);

	List<RequestedBook> findByMemberIdOrderByReservationDateDesc(Long memberId);
}

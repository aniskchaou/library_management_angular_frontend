package com.dev.delta.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.dev.delta.entities.Member;

@RepositoryRestResource
public interface MemberRepository extends JpaRepository<Member, Long> {

	@Query(nativeQuery = true, value = "select  m.status from Member m")
	List<String> getStatus();

	@Query(nativeQuery = true, value = "select  m.user_type from Member m")
	List<String> getUserType();

	@Query(nativeQuery = true, value = "select * from member m where m.status = :status and m.user_type=:type_id")
	List<Member> filterMemberByCriteria(@Param("status") String status, @Param("type_id") String type_id);

	// Query for counting the number of members by user type
	@Query("SELECT m.userType, COUNT(m) FROM Member m GROUP BY m.userType")
	List<Object[]> countMembersByUserType();

	// Query for counting the number of members by gender
	@Query("SELECT m.gender, COUNT(m) FROM Member m GROUP BY m.gender")
	List<Object[]> countMembersByGender();

	// Query for counting the number of members by age (assumed age is stored as string)
	@Query("SELECT m.age, COUNT(m) FROM Member m GROUP BY m.age")
	List<Object[]> countMembersByAge();

	// Query for counting the number of members by city
	@Query("SELECT m.city, COUNT(m) FROM Member m GROUP BY m.city")
	List<Object[]> countMembersByCity();



		// Find new arrivals (assuming new members are those added in the last month, for example)
		@Query("SELECT m FROM Member m WHERE m.createdDate = CURRENT_DATE ") // Assuming createdDate field exists
		List<Member> findNewArrivals();

		// Find unverified accounts
		List<Member> findByVerifiedFalse();

		// Find blocked members
		List<Member> findByBlockedTrue();

		// Find expired accounts
		List<Member> findByExpiredTrue();
}

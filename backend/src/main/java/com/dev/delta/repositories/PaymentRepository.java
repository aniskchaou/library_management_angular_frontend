package com.dev.delta.repositories;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.dev.delta.entities.Payment;

@RepositoryRestResource
public interface PaymentRepository extends JpaRepository<Payment, Long> {

	@Query(nativeQuery = true, value = "select * from member m where c.status = :status and c.type_id=:type_id  and c.user_type=:user_type ")
	List<Payment> filterMemberByCriteria(@Param("status") String status, @Param("type_id") String type_id,
			@Param("user_type") String user_type

	);

	//BigDecimal sumPaymentsByMemberId(Long id);


	@Query("SELECT SUM(p.amountPaid) FROM Payment p WHERE p.member.id = :memberId")
	BigDecimal sumAmountPaidByMember(@Param("memberId") Long memberId);
}

package com.dev.delta.repositories;

import com.dev.delta.entities.BankTransferPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankTransferPaymentRepository extends JpaRepository<BankTransferPayment, Long> {
    List<BankTransferPayment> findByMemberId(Long memberId);
    List<BankTransferPayment> findByStatus(String status);
    List<BankTransferPayment> findByMemberIdAndStatus(Long memberId, String status);
}

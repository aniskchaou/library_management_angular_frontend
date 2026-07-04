package com.dev.delta.repositories;

import com.dev.delta.entities.SaasBillingInvoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SaasBillingInvoiceRepository extends JpaRepository<SaasBillingInvoice, Long> {
    Page<SaasBillingInvoice> findByOrganizationId(Long organizationId, Pageable pageable);
    List<SaasBillingInvoice> findByOrganizationIdOrderByCreatedAtDesc(Long organizationId);
    Optional<SaasBillingInvoice> findByStripeInvoiceId(String stripeInvoiceId);
    Page<SaasBillingInvoice> findAllByOrderByCreatedAtDesc(Pageable pageable);
}

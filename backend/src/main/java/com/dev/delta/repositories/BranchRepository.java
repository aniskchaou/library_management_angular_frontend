package com.dev.delta.repositories;

import com.dev.delta.entities.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {
    List<Branch> findByOrganizationId(Long organizationId);
    List<Branch> findByOrganizationIdAndIsActiveTrue(Long organizationId);
    long countByOrganizationId(Long organizationId);
}

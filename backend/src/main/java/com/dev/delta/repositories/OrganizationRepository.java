package com.dev.delta.repositories;

import com.dev.delta.entities.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    Optional<Organization> findBySubdomain(String subdomain);

    List<Organization> findByStatus(Organization.OrgStatus status);

    boolean existsBySubdomain(String subdomain);

    @Query("SELECT COUNT(o) FROM Organization o WHERE o.status = 'ACTIVE'")
    long countActive();
}

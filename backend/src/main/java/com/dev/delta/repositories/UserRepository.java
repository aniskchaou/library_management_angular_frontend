package com.dev.delta.repositories;

import com.dev.delta.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email); // New method to find by email

    Optional<User> findByResetToken(String token);
}


package com.dev.delta.services;

import com.dev.delta.entities.AuditLog;
import com.dev.delta.entities.User;
import com.dev.delta.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogService auditLogService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userEntityOpt = userRepository.findByUsername(username);

        if (!userEntityOpt.isPresent()) {
            auditLogService.log(AuditLog.AuditAction.LOGIN, "User", null,
                    username, null, null, "Failed login: user not found");
            throw new UsernameNotFoundException("User not found");
        }

        User userEntity = userEntityOpt.get();

        if (userEntity.isLocked()) {
            auditLogService.log(AuditLog.AuditAction.LOGIN, "User", userEntity.getId(),
                    username, userEntity.getId(), userEntity.getOrganizationId(),
                    "Failed login: account locked");
            throw new LockedException("Account is locked: " + userEntity.getLockReason());
        }

        List<String> rolesWithoutPrefix = userEntity.getRoles().stream()
                .map(role -> role.startsWith("ROLE_") ? role.substring(5) : role)
                .collect(Collectors.toList());

        return org.springframework.security.core.userdetails.User
                .withUsername(userEntity.getUsername())
                .password(userEntity.getPassword())
                .roles(rolesWithoutPrefix.toArray(new String[0]))
                .accountExpired(false)
                .accountLocked(userEntity.isLocked())
                .credentialsExpired(false)
                .disabled(!userEntity.isActive())
                .build();
    }
}


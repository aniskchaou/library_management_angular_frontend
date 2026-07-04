package com.dev.delta.services;

import com.dev.delta.entities.User;
import com.dev.delta.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userEntityOpt = userRepository.findByUsername(username);

        if (!userEntityOpt.isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }

        User userEntity = userEntityOpt.get();
        System.out.println(userEntity.getPassword());

        List<String> rolesWithoutPrefix = userEntity.getRoles().stream()
                .map(role -> role.startsWith("ROLE_") ? role.substring(5) : role)
                .collect(Collectors.toList());
        return org.springframework.security.core.userdetails.User
                .withUsername(userEntity.getUsername())
                .password(userEntity.getPassword())
                .roles(rolesWithoutPrefix.toArray(new String[0])) // Assuming roles are stored in a collection
                //.roles(userEntity.getRoles().stream().map(role -> "ROLE_" + role).toArray(String[]::new))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
    }


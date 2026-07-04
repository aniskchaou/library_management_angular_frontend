package com.dev.delta.controllers;

import com.dev.delta.dto.JwtAuthRequest;
import com.dev.delta.dto.JwtAuthResponse;
import com.dev.delta.dto.RefreshTokenRequest;
import com.dev.delta.security.JwtTokenProvider;
import com.dev.delta.services.AuditLogService;
import com.dev.delta.entities.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuditLogService auditLogService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody JwtAuthRequest request,
                                   HttpServletRequest httpRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Map<String, Object> extras = new HashMap<>();
            extras.put("roles", userDetails.getAuthorities().toString());

            String accessToken = tokenProvider.generateTokenWithExtras(userDetails.getUsername(), extras);
            String refreshToken = tokenProvider.generateRefreshToken(userDetails.getUsername());

            auditLogService.log(AuditLog.AuditAction.LOGIN, "User", null,
                    userDetails.getUsername(), null, null,
                    "User logged in from " + httpRequest.getRemoteAddr());

            return ResponseEntity.ok(new JwtAuthResponse(accessToken, refreshToken, userDetails.getUsername(),
                    userDetails.getAuthorities().toString()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        } catch (LockedException e) {
            return ResponseEntity.status(423).body(Map.of("error", "Account is locked"));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        if (!tokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired refresh token"));
        }
        String username = tokenProvider.getUsernameFromToken(refreshToken);
        String newAccessToken = tokenProvider.generateTokenWithExtras(username, new HashMap<>());
        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication) {
        if (authentication != null) {
            auditLogService.log(AuditLog.AuditAction.LOGOUT, "User", null,
                    authentication.getName(), null, null, "User logged out");
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Map<String, Object> info = new HashMap<>();
        info.put("username", userDetails.getUsername());
        info.put("roles", userDetails.getAuthorities().toString());
        return ResponseEntity.ok(info);
    }
}

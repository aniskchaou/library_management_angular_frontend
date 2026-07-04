package com.dev.delta.security;

import com.dev.delta.entities.ApiRequestLog;
import com.dev.delta.repositories.ApiRequestLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class ApiMonitoringFilter extends OncePerRequestFilter {

    @Autowired
    private ApiRequestLogRepository apiLogRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        long start = System.currentTimeMillis();
        ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper(response);

        try {
            filterChain.doFilter(request, wrappedResponse);
        } finally {
            long duration = System.currentTimeMillis() - start;
            // Skip health/static/auth paths to reduce noise
            String path = request.getRequestURI();
            if (!path.startsWith("/actuator") && !path.startsWith("/swagger")) {
                saveLog(request, wrappedResponse.getStatus(), duration);
            }
            wrappedResponse.copyBodyToResponse();
        }
    }

    @Async
    protected void saveLog(HttpServletRequest request, int statusCode, long durationMs) {
        try {
            String username = null;
            org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated()) {
                username = auth.getName();
            }
            ApiRequestLog log = new ApiRequestLog(
                    request.getMethod(),
                    request.getRequestURI(),
                    statusCode,
                    durationMs,
                    null,  // organizationId resolved later if needed
                    username,
                    request.getRemoteAddr()
            );
            log.setUserAgent(request.getHeader("User-Agent"));
            apiLogRepo.save(log);
        } catch (Exception ignored) {}
    }
}

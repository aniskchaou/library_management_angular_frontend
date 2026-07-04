package com.dev.delta.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

/**
 * OAuth2 / Social Login Configuration.
 *
 * To enable SSO, add these to application.properties:
 *
 *   spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
 *   spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
 *   spring.security.oauth2.client.registration.google.scope=email,profile
 *
 *   spring.security.oauth2.client.registration.github.client-id=YOUR_GITHUB_CLIENT_ID
 *   spring.security.oauth2.client.registration.github.client-secret=YOUR_GITHUB_CLIENT_SECRET
 *
 * Then un-comment the oauth2Login() block below and re-build.
 *
 * This class is intentionally separated from WebSecurityConfig so that
 * OAuth2 can be toggled independently of the main JWT security configuration.
 */
@Configuration
public class OAuth2SecurityConfig {

    /**
     * Extend the main security chain to add OAuth2 Login.
     * Currently disabled — un-comment after configuring provider credentials.
     */
    /*
    @Bean
    public SecurityFilterChain oauth2FilterChain(HttpSecurity http) throws Exception {
        http
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/opac-account")
                .defaultSuccessUrl("/opac", true)
                .failureUrl("/opac-account?error=oauth2")
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(oAuth2UserService())
                )
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/opac-account")
            );
        return http.build();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService() {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
        return request -> {
            OAuth2User oAuth2User = delegate.loadUser(request);
            // Map OAuth2 attributes to local Member/User entity here
            return oAuth2User;
        };
    }
    */
}

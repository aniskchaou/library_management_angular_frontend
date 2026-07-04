package com.dev.delta.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * PasswordConfig
 * 
 * @author Admin
 *
 */
@Configuration
public class PasswordConfig {

	/**
	 * password encoder
	 * 
	 * @return
	 */
	/*@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10);
	}
*/}

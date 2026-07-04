package com.dev.delta.security;

import com.dev.delta.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
/**
 * WebSecurityConfig
 * 
 * @author Admin
 *
 */
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomUserDetailsService userDetailsService;
	/**
	 * PasswordEncoder
	 */
	//PasswordEncoder passwordEncoder;

	/**
	 * WebSecurityConfig
	 * 
	 * @param passwordEncoder
	 */
	/*@Autowired
	public WebSecurityConfig(PasswordEncoder passwordEncoder) {
		super();
		this.passwordEncoder = passwordEncoder;
	}*/

	/**
	 * configure
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		/*http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").permitAll().anyRequest()
				.authenticated().and().httpBasic();*/

		http.cors().disable()
				.csrf().disable()
				.authorizeRequests()
				// Allow unauthenticated access to the specific QR code URL
				.antMatchers("/book/get/**","/users/**","/version/get/**","/qrcode/get/**","/barcode/get/**","/users/get/**","/contract/vendor-files/**").permitAll()
				// Allow all OPTIONS requests (usually for CORS preflight)
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				// All other requests must be authenticated
				.anyRequest().authenticated()
				.and()
				.httpBasic();
	}

	/**
	 * userDetailsService
	 */
	/*@Override
	@Bean
	protected UserDetailsService userDetailsService() {
		UserDetails user1 = User.builder().username("emp").password(passwordEncoder.encode("123")).roles("employee")
				.build();

		UserDetails user2 = User.builder().username("admin").password(passwordEncoder.encode("admin")).roles("admin")
				.build();

		return new InMemoryUserDetailsManager(user1, user2);

	}*/

	@Bean
	public PasswordEncoder passwordEncoder() {
		//return new BCryptPasswordEncoder();
		return NoOpPasswordEncoder.getInstance();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

}

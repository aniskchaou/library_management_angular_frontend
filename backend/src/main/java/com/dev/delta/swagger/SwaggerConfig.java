package com.dev.delta.swagger;

import java.util.function.Predicate;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * SwaggerConfig
 * 
 * @author Admin
 *
 */
@Configuration
public class SwaggerConfig {


	/**
	 * productApi
	 * 
	 * @return
	 */
	@Bean
	public Docket productApi() {
		Predicate<String> contains = x -> x.contains("/");
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.dev.delta")).paths(contains).build().apiInfo(metaData());

	}

	/**
	 * metaData
	 * 
	 * @return
	 */
	private ApiInfo metaData() {
		@SuppressWarnings("deprecation")
		ApiInfo apiInfo = new ApiInfo("Library Lab", "Libarary management system", "v1.0", "terms of service",
				"Free license", "", "www.google.com");
		return apiInfo;
	}

}

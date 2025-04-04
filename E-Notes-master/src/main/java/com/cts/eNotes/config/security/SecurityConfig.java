package com.cts.eNotes.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	//authentication at database level
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
//		provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
		return provider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}
	
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(req -> req
//				.requestMatchers("/api/v1/auth/register**","/api/v1/auth/login**").permitAll()
//				.anyRequest().authenticated())
//				.httpBasic(Customizer.withDefaults())
//				.sessionManagement(session ->
//				session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//
//		return http.build();
//	}
	
	
	
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//one obj(http) is passing through diff methods
    	//configuring the authorization roles for http reqs
        return http.csrf(customizer -> customizer.disable()).
                authorizeHttpRequests(request -> request
                        .requestMatchers("/api/v1/auth/register","/api/v1/auth/login").permitAll()
//                        .requestMatchers("/api/v1/category/active").hasRole("ADMIN")
                    // .requestMatchers("/api/v1/notes/**").hasRole("USER")
//                        .requestMatchers("/api/v1/notes/","/api/v1/category/update","/api/v1/category/").hasAnyRole("ADMIN","USER")
                        .anyRequest().authenticated()).
                httpBasic(Customizer.withDefaults()).
                sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
 
 
    }
 
    @Bean
    public FilterRegistrationBean coresFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
 
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.addAllowedHeader("Authorization");
        corsConfiguration.addAllowedHeader("Content-Type");
        corsConfiguration.addAllowedHeader("Accept");
        corsConfiguration.addAllowedMethod("POST");
        corsConfiguration.addAllowedMethod("GET");
        corsConfiguration.addAllowedMethod("DELETE");
        corsConfiguration.addAllowedMethod("PUT");
        corsConfiguration.addAllowedMethod("OPTIONS");
        corsConfiguration.setMaxAge(3600L);
 
        source.registerCorsConfiguration("/**", corsConfiguration);
 
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
 
        bean.setOrder(-110);
 
        return bean;
    }
	
	
	
//	@Bean
//	public FilterRegistrationBean coresFilter() {
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		CorsConfiguration corsConfiguration = new CorsConfiguration();
//		corsConfiguration.setAllowCredentials(true);
//		corsConfiguration.addAllowedOriginPattern("*");
//		
//		source.registerCorsConfiguration("/**", corsConfiguration);
//		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//		return bean;
//	}
//	@Bean
//	public WebMvcConfigurer webMvcConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry ) {
//				registry.addMapping("/**")
//						.allowedMethods("GET", "POST", "DELETE", "PUT")
//						.allowedOrigins("http://localhost:5173")
//						;
//			}
//		};

	    
//	    public void addCorsMappings(CorsRegistry registry) {
//	        registry.addMapping("/**")
//	                .allowedOrigins("http://localhost:5173") // Allow your frontend origin
//	                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//	                .allowedHeaders("Content-Type", "Authorization");
//	    }

	
	
	
	
	
	
	
	
	
	
	
	
	
}

package com.example.demo.Security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;        // ✅
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;                            // ✅
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	private JwtAuthFilter jwtAuthFilter;
	
	public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
		this.jwtAuthFilter = jwtAuthFilter;
	}
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth

                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/planificateur/**").hasRole("PLANIFICATEUR")
                .requestMatchers("/api/financier/**").hasRole("FINANCIER")
                .requestMatchers("/api/utilisateurs/me").hasAnyRole("ADMIN","FINANCIER","PLANIFICATEUR","FORMATEUR","MANAGER","APPRENANT")
                .requestMatchers("/api/user/**").authenticated() 
                .requestMatchers("/api/presences/*/initialiser")
                    .hasRole("PLANIFICATEUR")
                .requestMatchers("/api/presences/marquer")
                    .hasRole("FORMATEUR")
                .requestMatchers("/api/presences/**")
                    .hasAnyRole("PLANIFICATEUR", "FORMATEUR", "ADMIN")


                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200"));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS","PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}

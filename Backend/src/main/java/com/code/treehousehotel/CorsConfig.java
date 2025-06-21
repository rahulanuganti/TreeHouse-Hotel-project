package com.code.treehousehotel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Apply to all paths
                        .allowedOrigins("http://localhost:5173")  // Allow your frontend's origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow these methods
                        .allowedHeaders("*")  // Allow all headers
                        .allowCredentials(true);  // Allow credentials such as cookies
            }
        };
    }

}

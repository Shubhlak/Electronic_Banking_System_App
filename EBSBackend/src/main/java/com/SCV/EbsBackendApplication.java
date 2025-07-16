package com.SCV;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EbsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EbsBackendApplication.class, args);
    }
    
    @Bean
    ModelMapper getMapper() {
        return new ModelMapper();
    }
}
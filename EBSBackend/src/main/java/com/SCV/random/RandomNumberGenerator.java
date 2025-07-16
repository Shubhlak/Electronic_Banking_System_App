package com.SCV.random;

import java.security.SecureRandom;
import java.util.Random;
import org.springframework.stereotype.Component;

@Component
public class RandomNumberGenerator {
    private static final SecureRandom secureRandom = new SecureRandom();
    
    public String generateDebitCardNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString(); 
    }
    
    public String generateAccountNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 12; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString(); 
    }
    
    public String generateTransactionId() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString(); 
    }
    
    public String generateCvv() {
        return String.format("%03d", secureRandom.nextInt(1000)); // Ensures 3-digit format
    }
}
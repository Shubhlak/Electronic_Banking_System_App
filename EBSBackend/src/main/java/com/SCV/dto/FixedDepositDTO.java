package com.SCV.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FixedDepositDTO {
    private Long id;
    private String accountNo;
    private Double principalAmount;
    private Integer durationMonths;
    private LocalDate startDate;
    private LocalDate maturityDate;
    private Double interestRate;
    private String status;
    private Double interestEarned;
}
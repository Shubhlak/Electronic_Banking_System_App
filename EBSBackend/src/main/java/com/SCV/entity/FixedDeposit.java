package com.SCV.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "fixed_deposit")
public class FixedDeposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_no", nullable = false)
    private Account account;

    @Column(name = "principal_amount", nullable = false)
    private Double principalAmount;

    @Column(name = "duration_months", nullable = false)
    private Integer durationMonths;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "maturity_date", nullable = false)
    private LocalDate maturityDate;

    @Column(name = "interest_rate", nullable = false)
    private Double interestRate;

    @Column(name = "status", nullable = false)
    private String status; // e.g., "ACTIVE", "CLOSED"

    @Column(name = "interest_earned")
    private Double interestEarned;
}
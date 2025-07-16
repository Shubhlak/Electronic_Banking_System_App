package com.SCV.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "beneficiary")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Beneficiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_account_no", nullable = false)
    private Account userAccount; // The account that adds the beneficiary

    @ManyToOne
    @JoinColumn(name = "beneficiary_account_no", nullable = false)
    private Account beneficiaryAccount; // The beneficiary's account

    @Column(name = "nickname")
    private String nickname; // Optional identifier
}
package com.SCV.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @Column(name = "account_no", unique=true)
    private String accountNo;

    @Column(name = "upi_pin")
    private String upiPin;

    @Column(name = "balance")
    private Double balance;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "bank_ifsc")
    private String bankIFSC;

    @Column(name = "adhar_card_no")
    private String adharCardNo;         

    @Column(name = "account_type")
    private String accountType;

    @Column(name = "debit_card_no",unique =true)
    private String debitCardNo;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable=false)
    private AccountStatus status;
}

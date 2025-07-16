package com.SCV.entity;

import com.SCV.entity.Account;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class DebitCard {
    @Id
    @Column(name = "debit_card_no")
    private String debitCardNo;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "cvv")
    private String cvv;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "account_no")
    private Account account;
}

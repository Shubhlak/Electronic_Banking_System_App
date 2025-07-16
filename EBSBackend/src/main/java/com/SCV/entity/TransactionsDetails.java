package com.SCV.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class TransactionsDetails {

    @Id
    public String transactionId;
    public String reciverAcountNo;
    public String senderAcountNo;
    public Integer amount;
    public String time;
    public LocalDate date;
    public String transactionType;
}
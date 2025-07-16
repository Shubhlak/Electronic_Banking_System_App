package com.SCV.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {

    public String transactionId;
    public String reciverAcountNo;
    public String senderAcountNo;
    public Integer amount;
    public String time;
    public String date;
    public String transactionType;
    public String accountType;
}
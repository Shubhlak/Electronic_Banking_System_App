package com.SCV.dto;

import com.SCV.entity.AccountStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//this will be saved in database
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private String accountNo;
    private String upiPin;
    private Double balance;  // Corrected from String to Double
    private String userId;
    private String bankIFSC;
    private String adharCardNo;//aded adhar
    private String accountType;
    private String debitCardNo;
    private AccountStatus status; // this is the new line added 
}
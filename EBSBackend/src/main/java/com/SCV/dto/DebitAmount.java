package com.SCV.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DebitAmount {

    public String reciverAcountNo;
    public String senderAcountNo;
    public Integer amount;
    public String upiPin;
    
}
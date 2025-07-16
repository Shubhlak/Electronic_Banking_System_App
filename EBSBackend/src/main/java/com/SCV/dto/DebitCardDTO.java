// src/main/java/com/SCV/dto/DebitCardDTO.java

package com.SCV.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DebitCardDTO {
    private String debitCardNo;  
    private String expiryDate;   
    private String cvv;
    private String status;
}

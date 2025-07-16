package com.SCV.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BeneficiaryDTO {
    private Long id;
    private String userAccountNo;
    private String beneficiaryAccountNo;
    private String nickname;
}
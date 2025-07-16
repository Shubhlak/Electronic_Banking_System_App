package com.SCV.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditUpiPin {
    String oldPassword;
    String newPassword;
    String confirmPassword;
}
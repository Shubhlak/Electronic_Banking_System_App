package com.SCV.controllers;

import com.SCV.dto.FixedDepositDTO;
import com.SCV.services.FixedDepositServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/fixeddeposit")
public class FixedDepositController {

    @Autowired
    private FixedDepositServices fixedDepositServices;

 
    @PostMapping("/open")
    public ResponseEntity<FixedDepositDTO> openFixedDeposit(@RequestBody FixedDepositDTO fixedDepositDTO) {
        FixedDepositDTO savedFixedDeposit = fixedDepositServices.openFixedDeposit(fixedDepositDTO);
        return ResponseEntity.ok(savedFixedDeposit);
    }
    
    
    @GetMapping("/account/{accountNo}")
    public ResponseEntity<List<FixedDepositDTO>> getFixedDepositsByAccountNo(@PathVariable String accountNo) {
        List<FixedDepositDTO> fixedDeposits = fixedDepositServices.getFixedDepositsByAccountNo(accountNo);
        return ResponseEntity.ok(fixedDeposits);
    }

    @PostMapping("/close/{fdId}")
    public ResponseEntity<FixedDepositDTO> closeFixedDeposit(
            @PathVariable Long fdId,
            @RequestParam(value = "closureDate", required = false) 
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate closureDate) {
        if (closureDate == null) {
            closureDate = LocalDate.now();
        }
        FixedDepositDTO closedFd = fixedDepositServices.closeFixedDeposit(fdId, closureDate);
        return ResponseEntity.ok(closedFd);
    }
}
package com.SCV.controllers;

import com.SCV.dto.BeneficiaryDTO;
import com.SCV.services.BeneficiaryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/beneficiary")
public class BeneficiaryController {

    @Autowired
    private BeneficiaryServices beneficiaryServices;

    @PostMapping("/add")
    public ResponseEntity<BeneficiaryDTO> addBeneficiary(@RequestBody BeneficiaryDTO beneficiaryDTO) {
        try {
            BeneficiaryDTO savedBeneficiary = beneficiaryServices.addBeneficiary(beneficiaryDTO);
            return new ResponseEntity<>(savedBeneficiary, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list/{userAccountNo}")
    public ResponseEntity<List<BeneficiaryDTO>> getBeneficiariesByUserAccountNo(@PathVariable String userAccountNo) {
        try {
            List<BeneficiaryDTO> beneficiaries = beneficiaryServices.getBeneficiariesByUserAccountNo(userAccountNo);
            if (beneficiaries.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(beneficiaries, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
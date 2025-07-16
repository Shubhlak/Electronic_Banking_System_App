package com.SCV.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.SCV.dto.DebitAmount;
import com.SCV.dto.TransactionDTO;
import com.SCV.services.TransactionServices;

@RestController
@RequestMapping("transaction")
public class TransactionController {

    @Autowired
    private TransactionServices transactionServices;
    
    @PutMapping("/debitamount")
    public ResponseEntity<TransactionDTO> debitAmount(@RequestBody DebitAmount debitAmount) {
        Optional<TransactionDTO> traOptional = transactionServices.debitAmount(debitAmount.senderAcountNo, debitAmount.reciverAcountNo, debitAmount.amount, debitAmount.upiPin);
        if (traOptional.isPresent()) {
            return new ResponseEntity<>(traOptional.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }
    
    @GetMapping(value = "/gettransactionhistorybyaccountno/{accountNo}")
    public ResponseEntity<List<TransactionDTO>> getTransactionHistoryByAccountNo(@PathVariable String accountNo) {
        List<TransactionDTO> list = transactionServices.getTransactionHistoryByAccountNo(accountNo);
        
        if (!list.isEmpty()) {
            System.out.println(list);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }
}
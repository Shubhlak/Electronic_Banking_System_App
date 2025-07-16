package com.SCV.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.SCV.entity.TransactionsDetails;
import com.SCV.repository.TransactionRepositroy;

public interface TransactionDao {
    
    public Optional<TransactionsDetails> debitAmount(String senderAccountNo, String reciverAccountNo, Integer amount, String upiPins);
    public void creditAmount(String accountNo, Integer amount);
    public List<TransactionsDetails> getTransactionHistoryByAccountNo(String accountNo);
    
}
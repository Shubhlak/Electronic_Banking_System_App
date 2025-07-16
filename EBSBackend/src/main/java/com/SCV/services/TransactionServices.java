package com.SCV.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SCV.dao.TransactionDao;
import com.SCV.dto.TransactionDTO;
import com.SCV.entity.TransactionsDetails;

@Service
public class TransactionServices {
    @Autowired
    private TransactionDao transactionDao;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public Optional<TransactionDTO> debitAmount(String senderAccountNo, String receiverAccountNo, Integer amount, String upiPin) {
        Optional<TransactionsDetails> traOptional = transactionDao.debitAmount(senderAccountNo, receiverAccountNo, amount, upiPin);
        if (traOptional.isPresent()) {
            TransactionsDetails transactionsDetails = traOptional.get();
            TransactionDTO transactionDTO = modelMapper.map(transactionsDetails, TransactionDTO.class);
            return Optional.of(transactionDTO);
        }
        return Optional.empty();
    }
    
    public List<TransactionDTO> getTransactionHistoryByAccountNo(String accountNo) {
        List<TransactionsDetails> list = transactionDao.getTransactionHistoryByAccountNo(accountNo);
        return list.stream()
                   .map(transaction -> modelMapper.map(transaction, TransactionDTO.class))
                   .collect(Collectors.toList());
    }
}
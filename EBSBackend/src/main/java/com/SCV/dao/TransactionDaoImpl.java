package com.SCV.dao;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.SCV.entity.Account;
import com.SCV.entity.TransactionsDetails;
import com.SCV.random.RandomNumberGenerator;
import com.SCV.repository.AccountRepository;
import com.SCV.repository.TransactionRepositroy;

@Repository
public class TransactionDaoImpl implements TransactionDao  {
    @Autowired
    private TransactionRepositroy transactionRepositroy;
    
    @Autowired
    private AccountRepository accountRepository;
    
    private RandomNumberGenerator randomNumberGenerator = new RandomNumberGenerator();

    @Override
    public Optional<TransactionsDetails> debitAmount(String senderAccountNo, String reciverAccountNo, Integer amount, String upiPin) {
        if (accountRepository.existsById(senderAccountNo) && accountRepository.existsById(reciverAccountNo)) {
            Optional<Account> senderAccountOptional = accountRepository.findById(senderAccountNo);
            Optional<Account> reciverAccountOptional = accountRepository.findById(reciverAccountNo);
            if (senderAccountOptional.isPresent()) {
                Account senderAccount = senderAccountOptional.get();
                Double currBalance = senderAccount.getBalance();
                String senderUpiPin = senderAccount.getUpiPin();
                if (currBalance >= amount && senderUpiPin.equals(upiPin)) {
                    LocalTime currentTime = LocalTime.now();
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
                    String formattedTime = currentTime.format(formatter);
                    TransactionsDetails transactionsDetails = new TransactionsDetails();
                    transactionsDetails.setAmount(amount);
                    transactionsDetails.setTransactionId(randomNumberGenerator.generateAccountNumber());
                    transactionsDetails.setSenderAcountNo(senderAccountNo);
                    transactionsDetails.setReciverAcountNo(reciverAccountNo);
                    transactionsDetails.setDate(LocalDate.now());
                    transactionsDetails.setTime(formattedTime);
                    transactionsDetails.setTransactionType("debit");
                    Account reciverAccount = reciverAccountOptional.get();
                    Double reciverAccountBalance = reciverAccount.getBalance();
                    Double senderAccountBalance = senderAccount.getBalance();
                    reciverAccount.setBalance(reciverAccountBalance + amount);
                    senderAccount.setBalance(senderAccountBalance - amount);
                    accountRepository.save(senderAccount);
                    accountRepository.save(reciverAccount);
                    transactionRepositroy.save(transactionsDetails);
                    return Optional.of(transactionsDetails);
                }
            }
        }
        return Optional.empty();
    }

    @Override
    public void creditAmount(String accountNo, Integer amount) {
        // TODO Auto-generated method stub
    }

    @Override
    public List<TransactionsDetails> getTransactionHistoryByAccountNo(String accountNo) {
        List<TransactionsDetails> list = transactionRepositroy.findBySenderAcountNo(accountNo);
        System.out.println(list);
        return list;
    }
}
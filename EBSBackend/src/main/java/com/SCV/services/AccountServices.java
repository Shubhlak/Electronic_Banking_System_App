// src/main/java/com/SCV/services/AccountServices.java
package com.SCV.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SCV.dao.AccountDao;
import com.SCV.dto.AccountDTO;
import com.SCV.entity.Account;
import com.SCV.entity.AccountStatus;

@Service
public class AccountServices {

    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private AccountDao accountDao;
    
    public Optional<AccountDTO> createAccount(AccountDTO accountDTO) {
        Account account = modelMapper.map(accountDTO, Account.class);
        // For regular users, set status to PENDING.
        // If the account being created is for ADMIN, force status ACTIVE.
        if ("ADMIN".equalsIgnoreCase(account.getUserId())) {
            account.setStatus(AccountStatus.ACTIVE);
        } else {
            account.setStatus(AccountStatus.PENDING);
        }
        Account accountSaved = accountDao.createAccount(account);
        AccountDTO accountDTO2 = modelMapper.map(accountSaved, AccountDTO.class);
        return Optional.of(accountDTO2);
    }
    
    public Optional<AccountDTO> checkBankBalance(String accountNo) {
        Optional<Account> accountOptional = accountDao.checkAccountBalance(accountNo);
        if (accountOptional.isPresent()) {
            AccountDTO accountDTO = modelMapper.map(accountOptional.get(), AccountDTO.class);
            return Optional.of(accountDTO);
        }
        return Optional.empty();
    }
    
    public Optional<AccountDTO> editUpiPin(String accountNo, String newPassword, String oldPassword) {
        Optional<Account> accountOptional = accountDao.editUpiPin(accountNo, newPassword, oldPassword);
        if (accountOptional.isPresent()) {
            AccountDTO accountDTO = modelMapper.map(accountOptional.get(), AccountDTO.class);
            return Optional.of(accountDTO);
        }
        return Optional.empty();
    }
    
    public boolean updateAccountStatus(String accountNo, AccountStatus newStatus) {
        Optional<Account> accountOptional = accountDao.findById(accountNo);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            account.setStatus(newStatus);
            accountDao.save(account);
            return true;
        }
        return false;
    }
    
    public List<AccountDTO> getAccountsByStatus(AccountStatus status) {
        List<Account> accounts = accountDao.findByStatus(status);
        return accounts.stream()
                .map(account -> modelMapper.map(account, AccountDTO.class))
                .collect(Collectors.toList());
    }
}

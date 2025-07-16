package com.SCV.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.SCV.entity.Account;
import com.SCV.entity.AccountStatus;
import com.SCV.entity.DebitCard;
import com.SCV.random.RandomNumberGenerator;
import com.SCV.repository.AccountRepository;
import com.SCV.repository.DebitCardRepository;

@Repository
public class AccountDaoImpl implements AccountDao {

    private RandomNumberGenerator randomNumberGenerator = new RandomNumberGenerator();
    
    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private DebitCardRepository debitCardRepository;
    
    
    //CHETAN TO GET ACCOUNT BY ID
    @Override
    public Optional<Account> findById(String accountNo) {
        return accountRepository.findById(accountNo);
    }
    
    //CHETAN SAVE FOR MODIFYING ACCOUNT
    @Override
    public Account save(Account account) {
        return accountRepository.save(account); 
    }

    @Override
    public Account createAccount(Account account) {
        account.setAccountNo(randomNumberGenerator.generateAccountNumber()); 
        return accountRepository.save(account);    
    }

    @Override
    public Optional<Account> editUpiPin(String accountNo, String newPassword, String oldPassword) {
        if (accountRepository.existsById(accountNo)) {
            Optional<Account> accountOptional = accountRepository.findById(accountNo);
            if (accountOptional.isPresent()) {
                Account account = accountOptional.get();
                if (account.getUpiPin() == null || account.getUpiPin().equals(oldPassword)) {
                    account.setUpiPin(newPassword);
                    account = accountRepository.save(account);
                    return Optional.of(account);
                }
            }
        }
        return Optional.empty();
    }

    @Override
    public Optional<Account> checkAccountBalance(String accountNo) {
        if (accountRepository.existsById(accountNo)) {
            return accountRepository.findById(accountNo);
        }
        return Optional.empty();
    }
    
    //CHETAN 
    @Override
    public boolean updateAccountStatus(String accountNo, AccountStatus newStatus) {
        Optional<Account> accountOptional = accountRepository.findById(accountNo);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            account.setStatus(newStatus);
            accountRepository.save(account);
            return true;
        }
        return false;
    }
    
    //CHETAN
    @Override
    public List<Account> findByStatus(AccountStatus status) {
        return accountRepository.findByStatus(status);
    }
}

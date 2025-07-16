package com.SCV.dao;

import java.util.List;
import java.util.Optional;

import com.SCV.entity.Account;
import com.SCV.entity.AccountStatus;

public interface AccountDao {

    public Account createAccount(Account account);
    public Optional<Account> editUpiPin(String accountNo, String newPassword, String oldPassword);
    public Optional<Account> checkAccountBalance(String accountNo);
    // public List<Account> getAccountsByUserId(Integer userId);
    
    Optional<Account> findById(String accountNo);

	Account save(Account account);

	boolean updateAccountStatus(String accountNo, AccountStatus newStatus);
	
	List<Account> findByStatus(AccountStatus status);
}
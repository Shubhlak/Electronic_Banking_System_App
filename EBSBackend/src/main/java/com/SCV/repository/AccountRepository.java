package com.SCV.repository;

import com.SCV.entity.Account;
import com.SCV.entity.AccountStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {

	List<Account> findByStatus(AccountStatus status);
}
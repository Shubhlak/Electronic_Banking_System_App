package com.SCV.services;

import com.SCV.dto.FixedDepositDTO;
import com.SCV.entity.Account;
import com.SCV.entity.FixedDeposit;
import com.SCV.repository.AccountRepository;
import com.SCV.repository.FixedDepositRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FixedDepositServices {

    @Autowired
    private FixedDepositRepository fixedDepositRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ModelMapper modelMapper;

  
    public FixedDepositDTO openFixedDeposit(FixedDepositDTO fixedDepositDTO) {
        // Fetch the account
        Account account = accountRepository.findById(fixedDepositDTO.getAccountNo())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        // Check if account has sufficient balance
        if (account.getBalance() < fixedDepositDTO.getPrincipalAmount()) {
            throw new RuntimeException("Insufficient balance to open fixed deposit");
        }

        // Map DTO to entity
        FixedDeposit fixedDeposit = modelMapper.map(fixedDepositDTO, FixedDeposit.class);
        fixedDeposit.setAccount(account);
        fixedDeposit.setStartDate(LocalDate.now());
        fixedDeposit.setMaturityDate(LocalDate.now().plusMonths(fixedDepositDTO.getDurationMonths()));
        fixedDeposit.setStatus("ACTIVE");
        fixedDeposit.setInterestEarned(0.0); // Interest will be calculated on maturity or closure

        
        account.setBalance(account.getBalance() - fixedDepositDTO.getPrincipalAmount());
        accountRepository.save(account);

        
        FixedDeposit savedFixedDeposit = fixedDepositRepository.save(fixedDeposit);
        return modelMapper.map(savedFixedDeposit, FixedDepositDTO.class);
    }

    
    // ye badlav ka code hai ab tumko faltu closed fd se jujna nai padega 
    public List<FixedDepositDTO> getFixedDepositsByAccountNo(String accountNo) {
        List<FixedDeposit> fixedDeposits = fixedDepositRepository.findByAccountAccountNo(accountNo);
        // Filter out closed or other statuses
        fixedDeposits = fixedDeposits.stream()
                .filter(fd -> "ACTIVE".equals(fd.getStatus()))
                .collect(Collectors.toList());

        return fixedDeposits.stream()
                .map(fd -> modelMapper.map(fd, FixedDepositDTO.class))
                .collect(Collectors.toList());
    }

    public FixedDepositDTO closeFixedDeposit(Long fdId, LocalDate closureDate) {
        // Retrieve the fixed deposit
        FixedDeposit fd = fixedDepositRepository.findById(fdId)
                .orElseThrow(() -> new RuntimeException("Fixed Deposit not found"));

        // Check if the FD is active
        if (!"ACTIVE".equals(fd.getStatus())) {
            throw new RuntimeException("Fixed Deposit is not active");
        }

        // Validate closure date
        if (closureDate.isBefore(fd.getStartDate())) {
            throw new RuntimeException("Closure date cannot be before start date");
        }

        // Calculate days active
        long daysActive = ChronoUnit.DAYS.between(fd.getStartDate(), closureDate);

        // Calculate interest: Principal * Rate * (Days/365)
        double interest = fd.getPrincipalAmount() * fd.getInterestRate() * (daysActive / 365.0);
        interest = Math.round(interest * 100.0) / 100.0; // Round to 2 decimal places

        // Update account balance
        Account account = fd.getAccount();
        account.setBalance(account.getBalance() + fd.getPrincipalAmount() + interest);

        // Update FD status and interest earned
        fd.setStatus("CLOSED");
        fd.setInterestEarned(interest);

        // Save changes
        accountRepository.save(account);
        fixedDepositRepository.save(fd);


        return modelMapper.map(fd, FixedDepositDTO.class);
    }
}
package com.SCV.dao;

import com.SCV.entity.Account;
import com.SCV.entity.Beneficiary;
import com.SCV.repository.AccountRepository;
import com.SCV.repository.BeneficiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BeneficiaryDaoImpl implements BeneficiaryDao {

    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Beneficiary addBeneficiary(Beneficiary beneficiary) {
        // Validate account existence
        Optional<Account> userAccountOpt = accountRepository.findById(beneficiary.getUserAccount().getAccountNo());
        Optional<Account> beneficiaryAccountOpt = accountRepository.findById(beneficiary.getBeneficiaryAccount().getAccountNo());

        if (!userAccountOpt.isPresent() || !beneficiaryAccountOpt.isPresent()) {
            throw new RuntimeException("One or both accounts do not exist");
        }

        // Prevent adding own account
        if (beneficiary.getUserAccount().getAccountNo().equals(beneficiary.getBeneficiaryAccount().getAccountNo())) {
            throw new RuntimeException("Cannot add own account as beneficiary");
        }

        // Check for duplicates
        List<Beneficiary> existing = beneficiaryRepository.findByUserAccountAccountNo(beneficiary.getUserAccount().getAccountNo());
        if (existing.stream().anyMatch(b -> b.getBeneficiaryAccount().getAccountNo().equals(beneficiary.getBeneficiaryAccount().getAccountNo()))) {
            throw new RuntimeException("Beneficiary already exists");
        }

        return beneficiaryRepository.save(beneficiary);
    }

    @Override
    public List<Beneficiary> getBeneficiariesByUserAccountNo(String userAccountNo) {
        if (!accountRepository.existsById(userAccountNo)) {
            throw new RuntimeException("User account does not exist");
        }
        return beneficiaryRepository.findByUserAccountAccountNo(userAccountNo);
    }
}
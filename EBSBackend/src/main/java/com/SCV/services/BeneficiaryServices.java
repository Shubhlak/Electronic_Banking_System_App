package com.SCV.services;

import com.SCV.dao.BeneficiaryDao;
import com.SCV.dto.BeneficiaryDTO;
import com.SCV.entity.Account;
import com.SCV.entity.Beneficiary;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BeneficiaryServices {

    @Autowired
    private BeneficiaryDao beneficiaryDao;

    @Autowired
    private ModelMapper modelMapper;

    public BeneficiaryDTO addBeneficiary(BeneficiaryDTO beneficiaryDTO) {
        // Create entity with account references
        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setNickname(beneficiaryDTO.getNickname());
        Account userAccount = new Account();
        userAccount.setAccountNo(beneficiaryDTO.getUserAccountNo());
        beneficiary.setUserAccount(userAccount);
        Account beneficiaryAccount = new Account();
        beneficiaryAccount.setAccountNo(beneficiaryDTO.getBeneficiaryAccountNo());
        beneficiary.setBeneficiaryAccount(beneficiaryAccount);

        Beneficiary savedBeneficiary = beneficiaryDao.addBeneficiary(beneficiary);
        return modelMapper.map(savedBeneficiary, BeneficiaryDTO.class);
    }

    public List<BeneficiaryDTO> getBeneficiariesByUserAccountNo(String userAccountNo) {
        List<Beneficiary> beneficiaries = beneficiaryDao.getBeneficiariesByUserAccountNo(userAccountNo);
        return beneficiaries.stream()
                .map(b -> modelMapper.map(b, BeneficiaryDTO.class))
                .collect(Collectors.toList());
    }
}
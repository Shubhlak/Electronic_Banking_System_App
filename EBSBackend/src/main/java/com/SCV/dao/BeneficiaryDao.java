package com.SCV.dao;

import com.SCV.entity.Beneficiary;
import java.util.List;

public interface BeneficiaryDao {
    Beneficiary addBeneficiary(Beneficiary beneficiary);
    List<Beneficiary> getBeneficiariesByUserAccountNo(String userAccountNo);
}
package com.SCV.repository;

import com.SCV.entity.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    List<Beneficiary> findByUserAccountAccountNo(String userAccountNo);
}
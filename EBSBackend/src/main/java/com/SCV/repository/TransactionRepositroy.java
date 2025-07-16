package com.SCV.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SCV.entity.TransactionsDetails;

public interface TransactionRepositroy extends JpaRepository<TransactionsDetails, String> {
    List<TransactionsDetails> findBySenderAcountNo(String senderAcountNo);
}
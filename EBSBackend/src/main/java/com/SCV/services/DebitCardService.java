// DebitCardService.java
package com.SCV.services;

import com.SCV.entity.Account;
import com.SCV.entity.DebitCard;
import com.SCV.repository.AccountRepository;
import com.SCV.repository.DebitCardRepository;
import com.SCV.random.RandomNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DebitCardService {

    @Autowired
    private DebitCardRepository debitCardRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RandomNumberGenerator randomNumberGenerator;

    public Optional<DebitCard> issueDebitCard(String accountNo) {
        // Check if the account exists
        Optional<Account> accountOptional = accountRepository.findById(accountNo);
        if (!accountOptional.isPresent()) {
            return Optional.empty(); // Account not found
        }
        Account account = accountOptional.get();

        // Check if a debit card already exists for this account
        List<DebitCard> existingCards = debitCardRepository.findByAccountAccountNo(accountNo);
        if (!existingCards.isEmpty()) {
            return Optional.empty(); // For simplicity, assume one card per account
        }

        // Create and populate a new debit card
        DebitCard debitCard = new DebitCard();
        debitCard.setDebitCardNo(randomNumberGenerator.generateDebitCardNumber());
        debitCard.setExpiryDate(LocalDate.now().plusYears(1));
        debitCard.setCvv(randomNumberGenerator.generateCvv());
        debitCard.setStatus("Locked");
        debitCard.setAccount(account);

        // Save the debit card to the database
        return Optional.of(debitCardRepository.save(debitCard));
    }
    
    // New method: Retrieve existing debit card details for an account.
    public List<DebitCard> getDebitCardDetails(String accountNo) {
        return debitCardRepository.findByAccountAccountNo(accountNo);
    }
}

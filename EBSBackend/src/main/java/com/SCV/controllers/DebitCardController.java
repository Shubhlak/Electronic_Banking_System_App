// src/main/java/com/SCV/controllers/DebitCardController.java

package com.SCV.controllers;

import com.SCV.dto.DebitCardDTO;
import com.SCV.entity.DebitCard;
import com.SCV.services.DebitCardService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/debitcard")
public class DebitCardController {

    @Autowired
    private DebitCardService debitCardService;

    @Autowired
    private ModelMapper modelMapper;

    // POST endpoint to issue a new card
    @PostMapping("/issue")
    public ResponseEntity<DebitCardDTO> issueDebitCard(@RequestBody IssueDebitCardRequest request) {
        Optional<DebitCard> debitCardOptional = debitCardService.issueDebitCard(request.getAccountNo());
        if (debitCardOptional.isPresent()) {
            DebitCardDTO dto = modelMapper.map(debitCardOptional.get(), DebitCardDTO.class);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // GET endpoint to retrieve existing card details
    @GetMapping("/details/{accountNo}")
    public ResponseEntity<DebitCardDTO> getDebitCardDetails(@PathVariable String accountNo) {
        List<DebitCard> cards = debitCardService.getDebitCardDetails(accountNo);
        if (cards != null && !cards.isEmpty()) {
            // Map the first card to DebitCardDTO
            DebitCardDTO dto = modelMapper.map(cards.get(0), DebitCardDTO.class);
            return ResponseEntity.ok(dto);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

// The request body for issuing a card
class IssueDebitCardRequest {
    private String accountNo;

    public String getAccountNo() {
        return accountNo;
    }
    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }
}

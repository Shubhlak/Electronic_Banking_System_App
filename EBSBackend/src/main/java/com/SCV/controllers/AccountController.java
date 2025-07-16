package com.SCV.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SCV.dto.AccountDTO;
import com.SCV.dto.EditUpiPin;
import com.SCV.entity.AccountStatus;
import com.SCV.services.AccountServices;

@RestController
@RequestMapping("account")
public class AccountController {

	@Autowired
	private AccountServices accountServices;

	@PostMapping(value = "/create_account")
	public ResponseEntity<AccountDTO> createAccount(@RequestBody AccountDTO accountDTO) {
		System.out.println(accountDTO);

		Optional<AccountDTO> aOptional = accountServices.createAccount(accountDTO);
		if (aOptional.isPresent()) {
			return new ResponseEntity<>(aOptional.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
	}

	@PutMapping(value = "/editupipin/{accountNo}")
	public ResponseEntity<Map<String, Object>> editUpiPin(@PathVariable String accountNo, @RequestBody EditUpiPin editUpiPin) {
		System.out.println(editUpiPin);
		Map<String, Object> response = new HashMap<>();
		
		// Ensure new password and confirm password match.
		if (!editUpiPin.getConfirmPassword().equals(editUpiPin.getNewPassword())) {
			response.put("success", false);
			response.put("message", "New password and confirm password do not match");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		
		Optional<AccountDTO> aOptional = accountServices.editUpiPin(accountNo, editUpiPin.getNewPassword(),
				editUpiPin.getOldPassword());
		if (aOptional.isPresent()) {
			response.put("success", true);
			response.put("message", "UPI PIN updated successfully");
			response.put("data", aOptional.get());
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			response.put("success", false);
			response.put("message", "Failed to update UPI PIN (old PIN might be wrong, or account not found)");
			return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
		}
	}

	@GetMapping(value = "/checkaccountbalanace/{accountNo}")
	public ResponseEntity<AccountDTO> checkAccountBalance(@PathVariable String accountNo) {
		Optional<AccountDTO> aOptional = accountServices.checkBankBalance(accountNo);
		if (aOptional.isPresent()) {
			return new ResponseEntity<>(aOptional.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
	}

	// CHETAN -- UPDATE STATUS FOR ADMIN
	@PutMapping("/{accountNo}/status/{status}")
	public String updateAccountStatus(@PathVariable String accountNo, @PathVariable AccountStatus status) {
		boolean updated = accountServices.updateAccountStatus(accountNo, status);
		return updated ? "Account status updated successfully!" : "Account not found!";
	}

	// CHETAN -- get account by Status for Admin
	@GetMapping(value = "/status/{status}")
	public ResponseEntity<List<AccountDTO>> getAccountsByStatus(@PathVariable AccountStatus status) {
		List<AccountDTO> accounts = accountServices.getAccountsByStatus(status);
		if (!accounts.isEmpty()) {
			return new ResponseEntity<>(accounts, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
	}
}

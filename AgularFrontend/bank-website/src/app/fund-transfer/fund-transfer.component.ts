// src/app/fund-transfer/fund-transfer.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FundTransferService } from '../services/fund-transfer.service';

@Component({
  selector: 'app-fund-transfer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  // Model for fund transfer form.
  // Note: We use "senderAccount" and "receiverAccount" in the model.
  transferData = {
    senderAccount: '',   // This will be filled with the logged-in user's account number.
    receiverAccount: '',
    amount: 0,
    upiPin: ''
  };

  constructor(
    private authService: AuthService,
    private fundTransferService: FundTransferService
  ) {}

  ngOnInit(): void {
    // Load the current user's profile to set the sender account number.
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.profile && response.profile.accountno) {
          this.transferData.senderAccount = response.profile.accountno;
        } else {
          console.error('Unable to load sender account number from profile');
        }
      },
      error: (err) => {
        console.error('Error fetching profile for fund transfer:', err);
      }
    });
  }

  transferFunds(): void {
    // Map the transferData model to the required JSON structure:
    // {
    //   "senderAcountNo": "038774893432",
    //   "reciverAcountNo": "143877917885",
    //   "amount": 1000,
    //   "upiPin": "5678"
    // }
    const payload = {
      senderAcountNo: this.transferData.senderAccount,
      reciverAcountNo: this.transferData.receiverAccount,
      amount: this.transferData.amount,
      upiPin: this.transferData.upiPin
    };

    // Call the FundTransferService to send the fund transfer request.
    this.fundTransferService.transferFunds(payload).subscribe({
      next: (res) => {
        alert('Funds transferred successfully!');
      },
      error: (err) => {
        console.error('Error transferring funds:', err);
        alert('Error transferring funds. Please try again.');
      }
    });
  }
}

// src/app/open-fixed-deposit/open-fixed-deposit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FixedDepositService } from '../services/fixed-deposit.service';

@Component({
  selector: 'app-open-fixed-deposit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './open-fixed-deposit.component.html',
  styleUrls: ['./open-fixed-deposit.component.css']
})
export class OpenFixedDepositComponent implements OnInit {
  fdData = {
    accountNo: '00000000',  // updated upon profile load
    principalAmount: 0,
    durationMonths: 12,
    interestRate: 5.5
  };

  constructor(
    private authService: AuthService,
    private fdService: FixedDepositService
  ) {}

  ngOnInit(): void {
    // Load the current user's profile to get the account number
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.profile && response.profile.accountno) {
          this.fdData.accountNo = response.profile.accountno;
        } else {
          console.error('Unable to load account number from profile');
        }
      },
      error: (err) => {
        console.error('Error fetching profile for FD:', err);
      }
    });
  }

  openFD() {
    this.fdService.openFixedDeposit(this.fdData).subscribe({
      next: (res) => {
        alert('Fixed Deposit Opened Successfully!');
      },
      error: (err) => {
        console.error('Error opening Fixed Deposit:', err);
        alert('Error opening Fixed Deposit. Please try again.');
      }
    });
  }
}

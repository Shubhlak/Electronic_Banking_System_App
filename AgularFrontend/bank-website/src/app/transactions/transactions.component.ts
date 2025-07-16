// src/app/transactions/transactions.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    // Get the logged-in user's profile to obtain their account number.
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.profile && response.profile.accountno) {
          const accountNo = response.profile.accountno;
          // Fetch transaction history using the account number.
          this.transactionService.getTransactionHistory(accountNo).subscribe({
            next: (res) => {
              this.transactions = res;
            },
            error: (err) => {
              console.error('Error fetching transaction history:', err);
            }
          });
        } else {
          console.error('Profile data is missing account number');
        }
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}

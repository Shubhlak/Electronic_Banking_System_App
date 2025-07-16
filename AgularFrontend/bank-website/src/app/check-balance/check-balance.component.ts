// src/app/check-balance/check-balance.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-check-balance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './check-balance.component.html',
  styleUrls: ['./check-balance.component.css']
})
export class CheckBalanceComponent implements OnInit {

  // We'll store the numeric balance here.
  balance: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // 1) First, get the user's profile to determine their account number.
    this.authService.getProfile().subscribe({
      next: (resp) => {
        if (resp.success && resp.profile && resp.profile.accountno) {
          const accountNo = resp.profile.accountno;
          
          // 2) Now call the getAccountBalance() method to fetch the balance from Spring Boot.
          this.authService.getAccountBalance(accountNo).subscribe({
            next: (accountData) => {
              // The Spring Boot endpoint returns an AccountDTO with a "balance" property.
              // Make sure that property name matches your actual Java field.
              if (accountData && accountData.accountNo) {
                this.balance = accountData.balance;
              } else {
                console.warn('No account data returned or missing fields');
              }
            },
            error: (err) => {
              console.error('Error fetching account balance:', err);
            }
          });

        } else {
          console.error('Could not fetch profile or accountNo missing');
        }
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}

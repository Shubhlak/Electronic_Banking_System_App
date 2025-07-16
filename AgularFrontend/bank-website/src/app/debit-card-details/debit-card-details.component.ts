// src/app/debit-card-details/debit-card-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DebitCardService } from '../services/debit-card.service';
@Component({
  selector: 'app-debit-card-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './debit-card-details.component.html',
  styleUrls: ['./debit-card-details.component.css']
})
export class DebitCardDetailsComponent implements OnInit {
  // This object will store the JSON returned by the backend:
  // { debitCardNo, expiryDate, cvv, status }
  cardDetails: any = null;
  accountNo: string = '';

  constructor(
    private authService: AuthService,
    private debitCardService: DebitCardService
  ) {}

  ngOnInit(): void {
    // 1) Fetch the user's accountNo from profile
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.profile && response.profile.accountno) {
          this.accountNo = response.profile.accountno;
          // 2) Attempt to load existing card details
          this.loadDebitCardDetails();
        } else {
          console.error('Unable to fetch account number from profile');
        }
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }

  loadDebitCardDetails(): void {
    this.debitCardService.getDebitCardDetails(this.accountNo).subscribe({
      next: (res) => {
        // If a card is returned, store it in cardDetails
        if (res) {
          this.cardDetails = res;
        }
      },
      error: (err) => {
        console.error('No debit card details found:', err);
      }
    });
  }

  issueDebitCard(): void {
    this.debitCardService.issueDebitCard(this.accountNo).subscribe({
      next: (res) => {
        this.cardDetails = res; // store the newly created card
        alert('Debit card issued successfully!');
      },
      error: (err) => {
        if (err.status === 400) {
          alert('A debit card is already issued for this account.');
          this.loadDebitCardDetails();
        } else {
          console.error('Error issuing debit card:', err);
          alert('Error issuing debit card. Please try again.');
        }
      }
    });
  }
}

// src/app/beneficiaries-list/beneficiaries-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BeneficiaryService } from '../services/beneficiary-service.service';

@Component({
  selector: 'app-beneficiaries-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.css']
})
export class BeneficiariesListComponent implements OnInit {
  beneficiaries: any[] = [];

  constructor(
    private authService: AuthService,
    private beneficiaryService: BeneficiaryService
  ) {}

  ngOnInit(): void {
    // Load the current user's profile to get their account number.
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.profile && response.profile.accountno) {
          const accountNo = response.profile.accountno;
          // Fetch beneficiaries using the current user's account number.
          this.beneficiaryService.getBeneficiaries(accountNo).subscribe({
            next: (res) => {
              this.beneficiaries = res;
            },
            error: (err) => {
              console.error('Error fetching beneficiaries:', err);
            }
          });
        } else {
          console.error('Unable to load user account number from profile');
        }
      },
      error: (err) => {
        console.error('Error fetching profile for beneficiaries:', err);
      }
    });
  }
}

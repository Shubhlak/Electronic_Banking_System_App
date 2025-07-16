// src/app/list-fixed-deposits/list-fixed-deposits.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FixedDepositService } from '../services/fixed-deposit.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-fixed-deposits',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-fixed-deposits.component.html',
  styleUrls: ['./list-fixed-deposits.component.css']
})
export class ListFixedDepositsComponent implements OnInit {
  accountNo: string = '';
  fixedDeposits: any[] = [];

  constructor(
    private authService: AuthService,
    private fdService: FixedDepositService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.profile && response.profile.accountno) {
          this.accountNo = response.profile.accountno;
          this.loadAllFds();
        } else {
          console.error('Unable to load user account number');
        }
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }

  loadAllFds(): void {
    this.fdService.getAllFixedDeposits(this.accountNo).subscribe({
      next: (fds) => {
        this.fixedDeposits = fds;
      },
      error: (err) => {
        console.error('Error fetching FDs:', err);
      }
    });
  }

  confirmClose(fdId: number): void {
    const userConfirmed = confirm('Are you sure you want to close this FD?');
    if (userConfirmed) {
      this.closeFd(fdId);
    }
  }

  closeFd(fdId: number): void {
    this.fdService.closeFixedDeposit(fdId).subscribe({
      next: (res) => {
        alert('Fixed Deposit closed successfully!');
        this.loadAllFds(); // reload after closing
      },
      error: (err) => {
        console.error('Error closing FD:', err);
        alert('Error closing FD. Please try again.');
      }
    });
  }
}

// src/app/welcome/welcome.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username = localStorage.getItem('username') || 'User';
  profile: any = {};

  modules = [
    { title: 'View Profile', description: 'View your profile details.', buttonText: 'View Profile', link: '/profile' },
    { title: 'Check Balance', description: 'Quickly view your current balance.', buttonText: 'Check Balance', link: '/balance' },
    { title: 'Fixed Deposit', description: 'Open a fixed deposit for better returns.', buttonText: 'Open FD', link: '/fixed-deposit' },
    { title: 'Debit Card Details', description: 'View your debit card information.', buttonText: 'View Details', link: '/debit-card' },
    { title: 'Fund Transfer', description: 'Transfer funds to another account easily.', buttonText: 'Transfer Funds', link: '/fund-transfer' },
    { title: 'Transactions', description: 'View all your transaction history.', buttonText: 'View Transactions', link: '/transactions' },
    { title: 'Add Beneficiary', description: 'Add a new beneficiary for seamless transfers.', buttonText: 'Add Beneficiary', link: '/add-beneficiary' },
    { title: 'Beneficiary List', description: 'View your list of beneficiaries.', buttonText: 'View Beneficiaries', link: '/beneficiaries' },
    {title: 'Virtual ATM', description: 'Kahi bhi, kabhi bhi paisa nikalo! Experience our new Virtual ATM facility.', buttonText: 'Use Virtual ATM', link: '/virtual-atm' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Fetch profile details from the Node server for the logged-in user.
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success) {
          this.profile = response.profile;
          // Update greeting if first and last names are provided
          if (this.profile.fname && this.profile.lname) {
            this.username = `${this.profile.fname} ${this.profile.lname}`;
          }
        } else {
          console.error('Profile fetch failed:', response.message);
        }
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
        this.router.navigate(['/login']);
      }
    });
  }
}

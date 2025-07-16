// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Define properties for binding
  email = '';
  userId = '';
  password = '';
  userType = 'customer';
  logedinStatus = 'false';
  bankName = 'SCV Bank';
  upiPin = '';
  balance = '10000';
  bankIFSC = 'SCVB0001';
  accountType = 'SAVINGS';
  fname = '';
  lname = '';
  age = '';
  phoneno = '';
  adhar_card_no = '';

  errorMessage = '';
  successMessage = '';
  minBalance = 5000; // Minimum required balance

  constructor(private authService: AuthService, private router: Router) {}

  // Method to handle registration form submission
  register() {
    const currentBalance = parseFloat(this.balance);
    if (isNaN(currentBalance) || currentBalance < this.minBalance) {
      this.errorMessage = `Minimum balance required is ${this.minBalance}.`;
      return;
    }

    const regData = {
      userId: this.userId,
      password: this.password,
      userType: this.userType,
      logedinStatus: this.logedinStatus,
      bankName: this.bankName,
      upiPin: this.upiPin,
      balance: this.balance,
      bankIFSC: this.bankIFSC,
      accountType: this.accountType,
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      age: this.age,
      phoneno: this.phoneno,
      adhar_card_no: this.adhar_card_no
    };

    this.authService.registerUser(regData).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message;
          alert('Registration successful! Please login.');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = response.message || 'Registration failed.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed.';
      }
    });
  }
}

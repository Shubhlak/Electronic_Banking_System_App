// src/app/add-beneficiary/add-beneficiary.component.ts
// Component for Adding a Beneficiary. Calls BeneficiaryService to post the beneficiary data.
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { BeneficiaryService } from '../services/beneficiary-service.service';

@Component({
  selector: 'app-add-beneficiary',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
  // Model for beneficiary data; note the field names match the backend DTO.
  beneficiary = {
    userAccountNo: '',         // This will be set to the current user's account number.
    beneficiaryAccountNo: '',
    nickname: ''
  };

  constructor(
    private beneficiaryService: BeneficiaryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Load the logged-in user's profile to fill in the userAccountNo.
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.profile && response.profile.accountno) {
          this.beneficiary.userAccountNo = response.profile.accountno;
        } else {
          console.error('Unable to load user account number from profile');
        }
      },
      error: (err) => {
        console.error('Error fetching profile for beneficiary:', err);
      }
    });
  }

  addBeneficiary() {
    // Call the BeneficiaryService to add the beneficiary.
    this.beneficiaryService.addBeneficiary(this.beneficiary).subscribe({
      next: (res) => {
        alert('Beneficiary added successfully!');
        // Optionally, reset the form model.
        this.beneficiary.beneficiaryAccountNo = '';
        this.beneficiary.nickname = '';
      },
      error: (err) => {
        console.error('Error adding beneficiary:', err);
        alert('Error adding beneficiary. Please try again.');
      }
    });
  }
}

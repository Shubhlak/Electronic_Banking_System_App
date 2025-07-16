import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-upi-pin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-upi-pin.component.html',
  styleUrls: ['./edit-upi-pin.component.css']
})
export class EditUpiPinComponent implements OnInit {
  upiForm: FormGroup;
  errorMessage: string = '';
  accountNo: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.upiForm = this.fb.group({
      oldUpiPin: ['', Validators.required],
      newUpiPin: ['', Validators.required],
      confirmNewUpiPin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch current profile to obtain the accountNo
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success) {
          const profile = response.profile;
          this.accountNo = profile.accountno; // assuming profile contains accountno
        } else {
          this.errorMessage = 'Unable to fetch profile data';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error fetching profile data';
      }
    });
  }

  onSubmit(): void {
    if (this.upiForm.valid) {
      const formData = this.upiForm.value;
      if (formData.newUpiPin !== formData.confirmNewUpiPin) {
        this.errorMessage = 'New UPI PIN and confirmation do not match';
        return;
      }
      const upiData = {
        oldPassword: formData.oldUpiPin,
        newPassword: formData.newUpiPin,
        confirmPassword: formData.confirmNewUpiPin
      };
      this.authService.editUpiPin(this.accountNo, upiData).subscribe({
        next: (response) => {
          if (response && response.success) {
            alert('UPI PIN updated successfully');
            this.router.navigate(['/profile']);
          } else {
            this.errorMessage = response.message || 'Failed to update UPI PIN';
          }
        },
        error: (err) => {
          this.errorMessage = 'Error updating UPI PIN';
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/profile']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phoneno: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Pre-fill the form with current profile data
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success) {
          const profile = response.profile;
          this.editForm.patchValue({
            fname: profile.fname,
            lname: profile.lname,
            phoneno: profile.phoneno
          });
        } else {
          this.errorMessage = 'Could not load profile data';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error loading profile data';
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedProfile = this.editForm.value;
      this.authService.updateProfile(updatedProfile).subscribe({
        next: (response) => {
          if (response.success) {
            alert("sab badaldiya bhaijan tension mat lo");
            this.router.navigate(['/profile']);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (err) => {
          this.errorMessage = 'Error updating profile';
        }
      });
    }
  }
}

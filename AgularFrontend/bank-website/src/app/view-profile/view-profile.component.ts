import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  // We initialize a profile object that will be filled by the API response
  profile: any = {
    userName: '',
    phone: '',
    adharCardNo: '',
    accountNo: '',
    accountType: '',
    bankIFSC: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  private fetchProfile(): void {
    this.authService.getProfile().subscribe({
      next: (response) => {
        if (response.success) {
          // The server returns an object with fields like fname, lname, phoneno, etc.
          const data = response.profile;
          this.profile.userName    = data.fname + ' ' + data.lname;
          this.profile.phone       = data.phoneno;
          this.profile.adharCardNo = data.adhar_card_no;
          this.profile.accountNo   = data.accountno;
          this.profile.accountType = data.account_type;
          this.profile.bankIFSC    = data.bank_ifsc;
        } else {
          console.error('Failed to fetch profile:', response.message);
        }
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}

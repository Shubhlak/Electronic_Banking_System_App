// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  // Method to register a user and create an account.
  registerUser(regData: any): Observable<any> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post(url, regData, { withCredentials: true });
  }

  // Method for login.
  login(username: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post(url, { username, password }, { withCredentials: true });
  }

  // Method for logout.
  logout(): Observable<any> {
    const url = `${this.BASE_URL}/logout`;
    return this.http.post(url, {}, { withCredentials: true });
  }

  // Method to fetch the logged-in user's profile.
  getProfile(): Observable<any> {
    const url = `${this.BASE_URL}/profile`;
    return this.http.get(url, { withCredentials: true });
  }

  // Method to update the user's profile (fname, lname, phoneno).
  updateProfile(profileData: any): Observable<any> {
    const url = `${this.BASE_URL}/profile`;
    return this.http.put(url, profileData, { withCredentials: true });
  }

  // this method is used to edit the UPI pin
  editUpiPin(accountNo: string, upiData: any): Observable<any> {
    const url = `${this.BASE_URL}/api/account/editupipin/${accountNo}`;
    return this.http.put(url, upiData, { withCredentials: true });
  }

  // this method is used to check the account balance and it will be called from the check-balance component
  getAccountBalance(accountNo: string): Observable<any> {
    const url = `${this.BASE_URL}/api/account/checkaccountbalanace/${accountNo}`;
    return this.http.get(url, { withCredentials: true });
  }
}

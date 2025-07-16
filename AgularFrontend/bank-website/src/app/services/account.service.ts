// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Use the Node API URL from your environment, e.g., "http://localhost:5000/api"
  private BASE_URL = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  // Get accounts with a specific status (e.g., 'PENDING')
  getAccountsByStatus(status: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/accounts/status/${status}`, { withCredentials: true });
  }

  // Update the status of an account
  updateAccountStatus(accountNo: string, status: string): Observable<any> {
    return this.http.put(`${this.BASE_URL}/accounts/${accountNo}/status/${status}`, {}, { withCredentials: true });
  }
}

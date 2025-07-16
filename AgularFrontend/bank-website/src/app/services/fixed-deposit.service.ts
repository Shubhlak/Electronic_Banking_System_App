// src/app/services/fixed-deposit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Adjust the path if you keep environment or direct BASE_URL
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FixedDepositService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  // Open a new FD
  openFixedDeposit(fdData: any): Observable<any> {
    const url = `${this.BASE_URL}/api/fixeddeposit/open`;
    return this.http.post(url, fdData, { withCredentials: true });
  }

  // NEW: Get all FDs for a user
  getAllFixedDeposits(accountNo: string): Observable<any> {
    // Node proxy => /api/fixeddeposit/account/{accountNo} => Spring Boot
    const url = `${this.BASE_URL}/api/fixeddeposit/account/${accountNo}`;
    return this.http.get(url, { withCredentials: true });
  }

  // NEW: Close an FD by ID
  closeFixedDeposit(fdId: number): Observable<any> {
    // Using POST with param: /close/{fdId}
    const url = `${this.BASE_URL}/api/fixeddeposit/close/${fdId}`;
    return this.http.post(url, {}, { withCredentials: true });
  }
}

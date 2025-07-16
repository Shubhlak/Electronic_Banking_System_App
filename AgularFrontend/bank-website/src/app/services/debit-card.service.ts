// src/app/debit-card.service.ts
// Service for handling debit card API calls.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebitCardService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  // Issue a debit card (POST /debitcard/issue)
  issueDebitCard(accountNo: string): Observable<any> {
    const url = `${this.BASE_URL}/api/debitcard/issue`;
    return this.http.post(url, { accountNo }, { withCredentials: true });
  }

  // Get existing debit card details (GET /debitcard/details/{accountNo})
  getDebitCardDetails(accountNo: string): Observable<any> {
    const url = `${this.BASE_URL}/api/debitcard/details/${accountNo}`;
    return this.http.get(url, { withCredentials: true });
  }
}

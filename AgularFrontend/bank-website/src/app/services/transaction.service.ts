// src/app/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  // Method to get transaction history by account number.
  getTransactionHistory(accountNo: string): Observable<any> {
    const url = `${this.BASE_URL}/api/transaction/gettransactionhistorybyaccountno/${accountNo}`;
    return this.http.get(url, { withCredentials: true });
  }
}

// src/app/fund-transfer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FundTransferService {
 private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  // Method to transfer funds.
  // This sends a PUT request to /transaction/debitamount, which is proxied to Spring Boot.
  transferFunds(data: any): Observable<any> {
    const url = `${this.BASE_URL}/api/transaction/debitamount`;
    return this.http.put(url, data, { withCredentials: true });
  }
}

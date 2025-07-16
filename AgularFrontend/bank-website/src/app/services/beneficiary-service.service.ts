// src/app/beneficiary.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  // Method to add a beneficiary.
  addBeneficiary(beneficiaryData: any): Observable<any> {
    const url = `${this.BASE_URL}/api/beneficiary/add`;
    return this.http.post(url, beneficiaryData, { withCredentials: true });
  }

  // NEW: Method to get beneficiaries by user account number.
  getBeneficiaries(userAccountNo: string): Observable<any> {
    const url = `${this.BASE_URL}/api/beneficiary/list/${userAccountNo}`;
    return this.http.get(url, { withCredentials: true });
  }
}

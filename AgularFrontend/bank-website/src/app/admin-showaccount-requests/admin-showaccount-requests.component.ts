// src/app/admin-showaccount-requests/admin-showaccount-requests.component.ts
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AccountService } from "../services/account.service";

@Component({
  selector: 'app-admin-showaccount-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-showaccount-requests.component.html',
  styleUrls: ['./admin-showaccount-requests.component.css']
})
export class AccountRequestsComponent implements OnInit {
  accountRequests: any[] = [];  // Store pending account requests

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getPendingAccounts();
  }

  getPendingAccounts() {
    this.accountService.getAccountsByStatus('PENDING').subscribe(
      (data) => {
        console.log("API Response:", data);
        this.accountRequests = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error fetching accounts:', error);
        this.accountRequests = [];
      }
    );
  }

  updateStatus(accountNo: string, newStatus: string) {
    console.log("Updating status for account:", accountNo, "to", newStatus);
    if (!accountNo) {
      console.error("Error: accountNo is undefined!");
      return;
    }
    this.accountService.updateAccountStatus(accountNo, newStatus).subscribe(
      () => {
        console.log(`Account ${accountNo} updated to ${newStatus}`);
        this.accountRequests = this.accountRequests.filter(acc => acc.accountNo !== accountNo);
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }
}

// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';  
import { CheckBalanceComponent } from './check-balance/check-balance.component';
import { OpenFixedDepositComponent } from './open-fixed-deposit/open-fixed-deposit.component';
import { DebitCardDetailsComponent } from './debit-card-details/debit-card-details.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import { BeneficiariesListComponent } from './beneficiaries-list/beneficiaries-list.component';
import { ListFixedDepositsComponent } from './list-fixed-deposits/list-fixed-deposits.component';
import { VirtualAtm } from './virtual-atm/virtual-atm.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AccountRequestsComponent } from './admin-showaccount-requests/admin-showaccount-requests.component';
import { EditUpiPinComponent } from './edit-upi-pin/edit-upi-pin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'profile', component: ViewProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent }, 
  { path: 'balance', component: CheckBalanceComponent },
  { path: 'fixed-deposit', component: OpenFixedDepositComponent },
  { path: 'list-fds', component: ListFixedDepositsComponent },
  { path: 'debit-card', component: DebitCardDetailsComponent },
  { path: 'fund-transfer', component: FundTransferComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'add-beneficiary', component: AddBeneficiaryComponent },
  { path: 'beneficiaries', component: BeneficiariesListComponent },
  { path: 'virtual-atm', component: VirtualAtm },
  { path: 'edit-upi-pin', component: EditUpiPinComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'admin/show-account-requests', component: AccountRequestsComponent },
  
  // Wildcard route
  { path: '**', redirectTo: '' }
];

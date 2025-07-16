// src/app/virtual-atm/virtual-atm.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virtual-atm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-atm.component.html',
  styleUrls: ['./virtual-atm.component.css']
})
export class VirtualAtm {
  // Define the options for the main ATM menu
  atmOptions = [
    {
      title: 'Withdraw Money',
      description: 'Take out cash from your account.',
      buttonText: 'Withdraw',
      action: 'withdraw'
    },
    {
      title: 'Deposit Money',
      description: 'Put cash into your account.',
      buttonText: 'Deposit',
      action: 'deposit'
    },
    {
      title: 'View Balance',
      description: 'Check your account balance instantly.',
      buttonText: 'View Balance',
      action: 'balance'
    }
  ];

  // Handle the button click for each ATM action
  onSelectOption(action: string) {
    console.log('Selected action:', action);
    // TODO: Implement navigation or open a modal for each action
    // e.g., if (action === 'withdraw') { ... }
  }
}

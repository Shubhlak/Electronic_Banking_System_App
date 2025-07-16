//home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  // Import CommonModule & RouterModule (for routerLink) plus your shared components
  imports: [CommonModule, RouterModule],
  template: `
 
    <div class="container text-center mt-5">
      <h1>Welcome to Our Bank</h1>
      <p>Secure and Fast Online Banking</p>
      <div class="mt-4">
        <a class="btn btn-primary btn-lg me-3" routerLink="/login">Start Internet Banking</a>
        <a class="btn btn-success btn-lg" routerLink="/register">Create an Account</a>
      </div>
    </div>

  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}

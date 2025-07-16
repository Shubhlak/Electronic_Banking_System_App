// src/app/admin-home/admin-home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('username');
      this.router.navigate(['/login']); // Redirect to login page after logout
    });
  }

  goToRequests(): void {
    console.log("Navigating to Show Account Requests..."); // Debug log
    this.router.navigate(['/admin/show-account-requests']); // Redirect to account requests page
  }
}

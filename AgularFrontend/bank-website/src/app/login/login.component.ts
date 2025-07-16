// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Calls AuthService.login() and redirects based on user type.
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('username', this.username);
          if (response.redirect === '/welcome') {
            this.router.navigate(['/welcome']);
          } else if (response.redirect === '/admin') {
            alert('Directing to admin panel');
            this.router.navigate(['/admin']);
          } else {
            this.errorMessage = 'Invalid user type.';
          }
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}

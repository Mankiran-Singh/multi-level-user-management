import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, FormsModule, RouterModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 name = '';
  email = '';
  password = '';
  role = 'ADMIN'; // default admin for first-time setup

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        alert('Registration successful. Please login.');
        this.router.navigate(['/login']);
      },
      error: err => alert(err.error?.error || err.error)
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  captcha = '';
  captchaInput = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCaptcha();
  }

  loadCaptcha() {
    this.auth.getCaptcha().subscribe((res: any) => {
      this.captcha = res.captcha;
    });
  }

  login() {
    // const hashedParams = CryptoJS.SHA256(this.password).toString();
    this.auth.login({
      email: this.email,
      password: this.password,
      captcha: this.captchaInput
    }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => alert(err.error)
    });
  }
}

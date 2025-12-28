import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:5050/auth';

  constructor(private http: HttpClient) {}

  getCaptcha() {
    return this.http.get(`${this.API}/captcha`);
  }

  login(data: any) {
    return this.http.post(`${this.API}/login`, data);
  }

  logout() {
    return this.http.post(`${this.API}/logout`, {});
  }

  me() {
    return this.http.get(`http://localhost:5050/users/me`);
  }
}

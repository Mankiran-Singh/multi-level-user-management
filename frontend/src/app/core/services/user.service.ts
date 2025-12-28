import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserService {
  private API = 'http://localhost:5050/users';

  constructor(private http: HttpClient) {}

  createUser(data: any) {
    return this.http.post(`${this.API}/create`, data);
  }

  downline() {
    return this.http.get(`${this.API}/downline`);
  }

  children() {
    return this.http.get(`${this.API}/children`);
  }
}

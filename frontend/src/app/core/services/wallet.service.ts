import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WalletService {
  private API = 'http://localhost:5050/wallet';

  constructor(private http: HttpClient) {}

  recharge(amount: number) {
    return this.http.post(`${this.API}/recharge`, { amount }, { withCredentials: true });
  }

  credit(data: any) {
    return this.http.post(`${this.API}/credit`, data);
  }

  statement() {
    return this.http.get(`${this.API}/statement`);
  }
}

import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.me().toPromise()
      .then(() => true)
      .catch(() => {
        this.router.navigate(['/login']);
        return false;
      });
  }
}

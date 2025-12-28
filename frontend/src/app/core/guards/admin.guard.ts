import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.me().pipe(
    map((user: any) => {
      if (user && user.role === 'ADMIN') {
        return true; // Authorized
      }
      
      // Not an admin, redirect to dashboard
      router.navigate(['/dashboard']);
      return false;
    }),
    catchError(() => {
      // API error or not logged in, redirect to login
      router.navigate(['/login']);
      return of(false);
    })
  );
};
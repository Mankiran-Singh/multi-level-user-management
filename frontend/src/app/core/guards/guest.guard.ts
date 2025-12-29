import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.me().pipe(
    map((user) => {
      if (user) {
        // User is logged in, don't let them see Login/Register
        router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      // If me() fails, it means they are a guest
      return of(true); 
    })
  );
};
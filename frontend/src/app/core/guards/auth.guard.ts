import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.me().pipe(
    // If me() returns successfully, allow navigation
    map(() => true),
    // If me() fails (401/403), redirect and block navigation
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
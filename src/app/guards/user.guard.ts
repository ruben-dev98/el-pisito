import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _authService = inject(AuthService);
  if(_authService.isLoggedIn()) {
    return true;
  } else {
    _router.navigate(['/login']);
    return false; 
  }
};

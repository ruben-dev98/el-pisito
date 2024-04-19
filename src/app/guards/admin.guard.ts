import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _authService = inject(AuthService);
  if(_authService.isLoggedIn() && _authService.getRol() == 'admin') {
    return true;
  } else if(_authService.isLoggedIn()) {
    _router.navigate(['/home']);
    return false; 
  } else {
    _router.navigate(['/login']);
    return false; 
  }
  
};

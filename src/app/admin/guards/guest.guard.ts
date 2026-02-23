import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // اگر کاربر لاگین کرده → نذار بره login
  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/']);
  }

  return true;
};

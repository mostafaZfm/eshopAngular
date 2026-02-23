import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const exp = localStorage.getItem('token_exp');

  // 1️⃣ اگر توکن وجود ندارد → هدایت به login
  if (!token || !exp) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  // 2️⃣ اگر توکن منقضی شده → logout و هدایت به login
  if (Date.now() >= +exp) {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  // 3️⃣ توکن معتبر → اجازه ورود
  return true;
};

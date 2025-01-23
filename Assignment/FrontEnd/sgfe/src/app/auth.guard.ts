import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isLoggedin = localStorage.getItem('isLoggedin');
  const isLoginPage = state.url === '/login';
  if (isLoggedin === null) {
    router.navigate(['/login']);
    return false;
  } else {
    if (isLoginPage) {
      router.navigate(['/conversation']);
      return false;
    }
    return true;
  }
};

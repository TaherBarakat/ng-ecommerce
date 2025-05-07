import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  if (authSrv.isUserLoggedIn.getValue()) {
    return true;
  } else {
    return router.createUrlTree(['']); // navigate to home
  }
};

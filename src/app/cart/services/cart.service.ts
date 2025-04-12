import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { ClerkService } from 'ngx-clerk';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: string[] = [];
  authSrv = inject(AuthService);
  router = inject(Router);
  clerkSrv = inject(ClerkService);

  constructor() {}

  addToCart(documentId: string) {
    if (this.clerkSrv.user$) {
      this.cart.push(documentId);
      console.log(this.cart, 'cart');
      console.log(this.clerkSrv.user$);
    } else {
      this.router.navigate(['auth', 'login']);
    }
  }
}

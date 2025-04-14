import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { ClerkService } from 'ngx-clerk';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartDataStorageService } from './cart-data-storage.service';
import { IPostCartReqBody } from '../cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: string[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0); // reactive state
  cartCount$ = this.cartCountSubject.asObservable(); // observable to expose

  authSrv = inject(AuthService);
  router = inject(Router);
  clerkSrv = inject(ClerkService);
  cartDataStRSrv = inject(CartDataStorageService);

  constructor() {}

  addToCart(documentId: string) {
    if (this.authSrv.isUserLoggedIn.value) {
      this.cart.push(documentId);
      this.cartCountSubject.next(this.cart.length); // notify subscribers
      console.log(this.cart);
    } else {
      this.router.navigate(['auth', 'login']);
    }
    this.onPostCart();
  }

  getCartItemsCount(): Observable<number> {
    return this.cartCount$; // expose the count as observable
  }
  getCartDocumentIdArray(): string[] {
    return [...this.cart];
  }

  onPostCart() {
    let products = {
      connect: this.getCartDocumentIdArray(),
    };

    let userData = this.authSrv.getUsernameAndEmail();

    let postCartReqBody: IPostCartReqBody = {
      data: { products, ...userData },
    };
    console.log(postCartReqBody);
    this.cartDataStRSrv
      .postCart(postCartReqBody)
      .subscribe((x) => console.log(x));
  }
}

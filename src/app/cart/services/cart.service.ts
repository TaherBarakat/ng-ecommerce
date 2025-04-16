import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { ClerkService } from 'ngx-clerk';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { CartDataStorageService } from './cart-data-storage.service';
import { ICarts, IPostCartReqBody } from '../cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartDocumentIds: string[] = [];
  private carts!: ICarts[];

  private cartCountSubject = new BehaviorSubject<number>(0); // reactive state
  cartCount$ = this.cartCountSubject.asObservable(); // observable to expose

  authSrv = inject(AuthService);
  router = inject(Router);
  clerkSrv = inject(ClerkService);
  cartDataStRSrv = inject(CartDataStorageService);

  constructor() {
    this.setLocalCartItems();
  }

  addToCart(documentId: string) {
    if (this.authSrv.isUserLoggedIn.value) {
      this.cartDocumentIds.push(documentId);
      this.cartCountSubject.next(this.cartDocumentIds.length); // notify subscribers
    } else {
      this.router.navigate(['auth', 'login']);
    }
    // this.onPostCart();
    this.cartDataStRSrv
      .getCarts(this.authSrv.getUsernameAndEmail.Email)
      .subscribe((x) => console.log(x));
  }

  getCartItemsCount(): Observable<number> {
    return this.cartCount$; // expose the count as observable
  }
  getCartDocumentIdArray(): string[] {
    return [...this.cartDocumentIds];
  }

  setLocalCartItems() {
    this.authSrv.isUserLoggedIn
      .pipe(
        filter((loggedIn) => loggedIn === true), // only proceed if true
        switchMap(() =>
          this.cartDataStRSrv.getCarts(this.authSrv.getUsernameAndEmail.Email)
        )
      )
      .subscribe((carts) => {
        carts?.data ? (this.carts = carts?.data) : (this.carts = []);
        this.cartDocumentIds = carts.data.map((cart) => cart.documentId);
        this.cartCountSubject.next(this.cartDocumentIds.length);

        // console.log(carts);
      });
  }
  get getCarts() {
    return this.carts;
  }
  onPostCart() {
    let products = {
      connect: this.getCartDocumentIdArray(),
    };

    let userData = this.authSrv.getUsernameAndEmail;

    let postCartReqBody: IPostCartReqBody = {
      data: { products, ...userData },
    };
    this.cartDataStRSrv
      .postCart(postCartReqBody)
      .subscribe((x) => console.log(x));
  }
}

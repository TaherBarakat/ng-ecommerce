import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { ClerkService } from 'ngx-clerk';
import {
  BehaviorSubject,
  concatMap,
  filter,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { CartDataStorageService } from './cart-data-storage.service';
import { ICarts, IPostCartReqBody } from '../cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProductsDocumentIds: string[] = [];
  private cart?: ICarts;
  private cartCountSubject = new BehaviorSubject<number>(0); // reactive state
  private totalAmountSubject = new BehaviorSubject<number>(0); // reactive state

  private authSrv = inject(AuthService);
  private router = inject(Router);
  private clerkSrv = inject(ClerkService);
  private cartDataStRSrv = inject(CartDataStorageService);

  cartCount$ = this.cartCountSubject.asObservable();
  totalAmount$ = this.totalAmountSubject.asObservable();

  constructor() {
    this.setLocalCartItems();
  }

  setLocalCartItems() {
    this.authSrv.isUserLoggedIn
      .pipe(
        filter((loggedIn) => loggedIn === true),
        switchMap(() =>
          this.cartDataStRSrv.getCart(this.authSrv.getUsernameAndEmail.Email)
        ),
        tap((resp) =>
          resp.data != undefined
            ? resp
            : this.cartDataStRSrv
                .initCart()
                .subscribe((res) => console.log(res))
        )
      )
      .subscribe((cart) => {
        if (cart?.data) {
          if (!this.cart) this.cart = cart?.data;
          else Object.assign(this.cart, cart.data);

          this.cartProductsDocumentIds = cart.data.products.map(
            (product) => product.documentId
          );
          this.cartCountSubject.next(this.cartProductsDocumentIds.length);
          this.totalAmountSubject.next(this.totalAmount);
        }
      });
  }

  addToCart(productDocumentId: string) {
    // if (this.cartProductsDocumentIds.includes(productDocumentId)) return;

    if (this.authSrv.isUserLoggedIn.value) {
      // let products = ;
      let postToCartReqBody = {
        data: {
          products: {
            connect: [productDocumentId],
          },
        },
      };
      this.cartDataStRSrv
        .postToCart(postToCartReqBody, this.cart!.documentId)
        .subscribe(() => {
          this.setLocalCartItems();
        });
    } else {
      this.router.navigate(['auth', 'login']);
    }
    // this.onPostToCart(documentId);
  }

  getCartItemsCount(): Observable<number> {
    return this.cartCount$; // expose the count as observable
  }
  getCartProductDocumentIdArray(): string[] {
    return [...this.cartProductsDocumentIds];
  }

  deleteFromCart(documentId: string) {
    // if (this.cartProductsDocumentIds.includes(documentId)) return;
    if (this.authSrv.isUserLoggedIn.value) {
      let filteredCartProductsDocumentIds = this.cartProductsDocumentIds.filter(
        (deletedDocumentId) => deletedDocumentId !== documentId
      );
      // this.cart?.products.push(documentId);

      // let products = ;
      let postToCartReqBody = {
        data: {
          products: {
            set: [filteredCartProductsDocumentIds],
          },
        },
      };
      this.cartDataStRSrv
        .postToCart(postToCartReqBody, this.cart!.documentId)
        .subscribe(() => {
          this.setLocalCartItems();
        });
    }
    // this.onPostToCart(documentId);
  }

  resetCart() {
    let postToCartReqBody = {
      data: {
        products: {
          set: [],
        },
      },
    };
    this.cartDataStRSrv
      .postToCart(postToCartReqBody, this.cart!.documentId)
      .subscribe(() => {
        this.setLocalCartItems();
      });
  }

  // onPostToCart(productId: string) {}
  get totalAmount(): number {
    let totalAmount: number = 0;
    if (this.cart?.products.length == 0 || !this.cart) return totalAmount;
    for (const product of this.cart.products) {
      totalAmount += product.price || 0;
    }
    return totalAmount;
  }
  // onDeleteFromCart(productId: string) {
  //   let products = {
  //     connect: [productId],
  //   };
  //   let postToCartReqBody = {
  //     data: { products },
  //   };
  //   this.cartDataStRSrv
  //     .postToCart(postToCartReqBody, this.cart!.documentId)
  //     .subscribe((x) => {
  //       this.setLocalCartItems();
  //     });
  // }

  get getCart() {
    return this.cart;
  }
}

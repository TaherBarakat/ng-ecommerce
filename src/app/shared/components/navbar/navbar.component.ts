import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import {
  ClerkService,
  ClerkUserButtonComponent,
  ClerkUserProfileComponent,
} from 'ngx-clerk';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    ClerkUserButtonComponent,
    AsyncPipe,
    NgIf,
    LucideAngularModule,
    // LucideAngularModule.pick({ ShoppingCart }),
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authSrv = inject(AuthService);
  clerkSrv = inject(ClerkService);
  cartSrv = inject(CartService);

  readonly cartIcon = ShoppingCart;

  // .subscribe((user) => {
  // isUserLoggedIn$ = this.authSrv.isUserLoggedIn;
  isUserLoggedIn$ = this.clerkSrv.user$;
  cartItemsCount = this.cartSrv.getCartItemsCount();
  // ngOnInit() {
  //   console.log(this.isLoggedInMode);
  //   this.authSrv.isUserLoggedIn.subscribe((isUserLoggedIn) => {
  //     console.log('isLoggedIn temp', this.isLoggedInMode);
  //     console.log('isLoggedIn clerck', isUserLoggedIn);
  //     this.isLoggedInMode = isUserLoggedIn;
  //   });
  // }
}

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import {
  ClerkService,
  ClerkUserButtonComponent,
  ClerkUserProfileComponent,
} from 'ngx-clerk';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';
import {
  LucideAngularModule,
  Route,
  Router,
  ShoppingCart,
} from 'lucide-angular';
import { CartDropDownComponent } from '../../../cart/components/cart-drop-down/cart-drop-down.component';
const NAV_LINKS = [
  { path: '', title: 'home' },
  { path: '/explore', title: 'Explore' },
  { path: '/Projects', title: 'Projects' },
  { path: '/about-us', title: 'About Us' },
];
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    ClerkUserButtonComponent,
    AsyncPipe,
    NgIf,
    ClerkUserProfileComponent,
    LucideAngularModule,
    CartDropDownComponent,
    // LucideAngularModule.pick({ ShoppingCart }),
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('userButton') userButton!: any;

  authSrv = inject(AuthService);
  clerkSrv = inject(ClerkService);
  cartSrv = inject(CartService);

  isMobileMenuOpen = false;
  readonly cartIcon = ShoppingCart;

  onToggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
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
  isCartDropDownOpen = false;
  onOpenCartDropDown() {
    this.isCartDropDownOpen = !this.isCartDropDownOpen;
  }
  // route = inject(Route)
  // navToCartPage() {
  // this.r
  // }

  links = [
    { path: '/', title: 'Home' },
    { path: '/products', title: 'Products' },
    { path: '/projects', title: 'Projects' },
    { path: '/about-us', title: 'About Us' },
  ];
}

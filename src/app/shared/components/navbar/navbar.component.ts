import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import {
  ClerkService,
  ClerkUserButtonComponent,
  ClerkUserProfileComponent,
} from 'ngx-clerk';
import { Router } from '@angular/router';

import { AsyncPipe, NgIf } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';
import { LucideAngularModule, Route, ShoppingCart } from 'lucide-angular';
import { CartDropDownComponent } from '../../../cart/components/cart-drop-down/cart-drop-down.component';
const NAV_LINKS = [
  { path: '/', title: 'Home' },
  { path: '/products', title: 'Products' },
  { path: '/projects', title: 'Projects' },
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
  authSrv = inject(AuthService);
  clerkSrv = inject(ClerkService);
  cartSrv = inject(CartService);
  _router = inject(Router);
  cartIcon = ShoppingCart;
  isMobileMenuOpen = false;
  isUserLoggedIn$ = this.clerkSrv.user$;
  cartItemsCount = this.cartSrv.getCartItemsCount();
  isCartDropDownOpen = false;

  links = NAV_LINKS;

  handleCartClick(): void {
    const isLargeScreen = window.innerWidth >= 640; // adjust breakpoint as needed (e.g., 1024px for lg)

    if (isLargeScreen) {
      this.onOpenCartDropDown();
    } else {
      this._router.navigate(['/cart']);
    }
  }

  onToggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  onOpenCartDropDown() {
    this.isCartDropDownOpen = !this.isCartDropDownOpen;
  }
}

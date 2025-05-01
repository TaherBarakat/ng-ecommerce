import { Component, inject } from '@angular/core';
import { ICarts } from '../../cart.interface';
import { CartService } from '../../services/cart.service';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartSrv = inject(CartService);
  cart?: ICarts;
  totalAmount!: number;
  test: number[] = [];

  ngOnInit() {
    this.cart = this.cartSrv.getCart;
    console.log(this.cart);
    this.cartSrv.totalAmount$.subscribe(
      (newTotalAmount: number) => (this.totalAmount = newTotalAmount)
    );
  }
  onDeleteCartItem(productDocumentId: string) {
    this.cartSrv.deleteFromCart(productDocumentId);
    // this.cart = this.cartSrv.getCart;
  }
}

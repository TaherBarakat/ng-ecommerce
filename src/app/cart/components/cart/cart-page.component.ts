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
  carts!: ICarts[];
  totalAmount = this.cartSrv.totalAmount;

  ngOnInit() {
    this.carts = this.cartSrv.getCarts;
    console.log(this.carts);
  }
  onCheckout() {}
}

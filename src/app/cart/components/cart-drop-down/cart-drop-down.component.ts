import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ICarts } from '../../cart.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-drop-down',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-drop-down.component.html',
  styleUrl: './cart-drop-down.component.css',
})
export class CartDropDownComponent {
  @Output() isOpen = new EventEmitter<boolean>();
  cartSrv = inject(CartService);
  cart!: ICarts;

  ngOnInit() {
    this.cart = this.cartSrv.getCart;
    console.log(this.cartSrv.getCart);
  }
  onCloseCart() {
    this.isOpen.emit(false);
  }
}

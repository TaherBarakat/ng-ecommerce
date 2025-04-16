import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ICarts } from '../../cart.interface';

@Component({
  selector: 'app-cart-drop-down',
  standalone: true,
  imports: [],
  templateUrl: './cart-drop-down.component.html',
  styleUrl: './cart-drop-down.component.css',
})
export class CartDropDownComponent {
  @Output() isOpen = new EventEmitter<boolean>();
  cartSrv = inject(CartService);
  carts!: ICarts[];

  ngOnInit() {
    this.carts = this.cartSrv.getCarts;
    console.log(this.carts);
  }
  onCloseCart() {
    this.isOpen.emit(false);
  }
}

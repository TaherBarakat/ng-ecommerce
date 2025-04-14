import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-cart-drop-down',
  standalone: true,
  imports: [],
  templateUrl: './cart-drop-down.component.html',
  styleUrl: './cart-drop-down.component.css',
})
export class CartDropDownComponent {
  @Output() isOpen = new EventEmitter<boolean>();

  onCloseCart() {
    this.isOpen.emit(false);
  }
}

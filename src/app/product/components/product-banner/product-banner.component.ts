import { Component, inject, Input } from '@angular/core';
import { StrapiResponse, Course } from '../../product.interface';
import { ProductDataStorageService } from '../../services/product-data-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Subscribable, subscribeOn, Subscription } from 'rxjs';
import {
  LucideAngularModule,
  ShoppingCart,
  BadgeCheck,
  OctagonAlert,
} from 'lucide-angular';
import { ProductListComponent } from '../product-list/product-list.component';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-banner',
  standalone: true,
  imports: [LucideAngularModule, ProductListComponent, NgIf, NgOptimizedImage],
  templateUrl: './product-banner.component.html',
  styleUrl: './product-banner.component.css',
})
export class ProductBannerComponent {
  @Input() product: Course | undefined;
  @Input() isLoading: boolean = true;

  readonly shoppingCart = ShoppingCart;
  readonly badgeCheck = BadgeCheck;
  readonly octagonAlert = OctagonAlert;

  cartSrv = inject(CartService);
  onAddToCart() {
    this.cartSrv.addToCart(this.product?.documentId || '');
  }
}

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
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-banner',
  standalone: true,
  imports: [LucideAngularModule, ProductListComponent, NgIf],
  templateUrl: './product-banner.component.html',
  styleUrl: './product-banner.component.css',
})
export class ProductBannerComponent {
  @Input() product: Course | undefined;

  readonly shoppingCart = ShoppingCart;
  readonly badgeCheck = BadgeCheck;
  readonly octagonAlert = OctagonAlert;
}

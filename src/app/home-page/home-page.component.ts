import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { ProductDataStorageService } from '../product/services/product-data-storage.service';
import { ProductListComponent } from '../product/components/product-list/product-list.component';
import { Course, StrapiResponse } from '../product/product.interface';
import { ClerkService, ClerkUserProfileComponent } from 'ngx-clerk';
import { PaymentService } from '../stripe-checkout/services/payment.service';
import { RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    BannerComponent,
    ProductListComponent,
    RouterLink,
    ClerkUserProfileComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  productDataStrSrc = inject(ProductDataStorageService);
  paymentSrv = inject(PaymentService);
  products: Course[] = [];

  clerkSrv = inject(ClerkService);
  ngOnInit(): void {
    this.productDataStrSrc
      .getAllProduct()
      .pipe(
        map((response) => {
          // Get the data array
          const data = response.data || [];
          // Sort by creation date (newest first)
          const sorted = [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          // Take first 4 items
          return sorted.slice(0, 4);
        })
      )
      .subscribe((response) => {
        this.products = response ?? [];
      });

    //   this.paymentSrv
    //     .createPaymentIntent(1, 'usd')
    //     .subscribe((x) => console.log(x));
    //
  }
}

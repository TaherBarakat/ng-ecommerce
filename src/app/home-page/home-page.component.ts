import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { ProductDataStorageService } from '../product/services/product-data-storage.service';
import { ProductListComponent } from '../product/components/product-list/product-list.component';
import { Course, StrapiResponse } from '../product/product.interface';
import { ClerkService, ClerkUserProfileComponent } from 'ngx-clerk';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BannerComponent, ProductListComponent, ClerkUserProfileComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  productDataStrSrc = inject(ProductDataStorageService);
  products: Course[] = [];

  clerkSrv = inject(ClerkService);
  ngOnInit(): void {
    this.productDataStrSrc.getAllProduct().subscribe((response) => {
      this.products = response?.data ?? [];
    });
  }
}

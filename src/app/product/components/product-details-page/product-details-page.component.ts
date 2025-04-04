import { Component, inject } from '@angular/core';
import { ProductBannerComponent } from '../product-banner/product-banner.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { StrapiResponse, Course } from '../../product.interface';
import { ProductDataStorageService } from '../../services/product-data-storage.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [ProductBannerComponent, ProductListComponent],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css',
})
export class ProductDetailsPageComponent {
  productDataStrSrc = inject(ProductDataStorageService);
  products: StrapiResponse<Course> | undefined;
  ngOnInit(): void {
    this.productDataStrSrc
      .getAllProduct()
      .subscribe((response) => (this.products = response));
  }
}

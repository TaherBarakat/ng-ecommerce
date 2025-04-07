import { Component, inject } from '@angular/core';
import { ProductBannerComponent } from '../product-banner/product-banner.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { StrapiResponse, Course } from '../../product.interface';
import { ProductDataStorageService } from '../../services/product-data-storage.service';
import { ActivatedRoute } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [ProductBannerComponent, ProductListComponent],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css',
})
export class ProductDetailsPageComponent {
  recommendedProducts: Course[] | undefined;

  product: Course | undefined;
  productId: string | undefined;
  productSub$: Subscription | undefined;

  productDataStrSrv = inject(ProductDataStorageService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.route.params.subscribe((params) => {
      this.productSub$ = this.productDataStrSrv
        .getProductById(params['documentId'])
        .subscribe((response) => {
          this.product = response.data ?? undefined;
          this.loadRecommendedProducts(this.product?.category);
        });
    });
  }
  loadRecommendedProducts(category: string | null) {
    if (category) {
      this.productDataStrSrv
        .filterProductsByCategory(category)
        .subscribe((response) => {
          if (Array.isArray(response?.data)) {
            this.recommendedProducts =
              response?.data?.filter(
                (x: Course) => x.documentId !== this.product?.documentId
              ) ?? undefined;
          }
        });
    }
  }
}

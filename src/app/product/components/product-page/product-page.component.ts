import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { Course } from '../../product.interface';
import { ProductDataStorageService } from '../../services/product-data-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  products!: Course[];
  productDataStrSrv = inject(ProductDataStorageService);
  route = inject(ActivatedRoute);
  ngOnInit() {
    this.productDataStrSrv.getAllProduct().subscribe((response) => {
      this.products = response?.data ?? [];
    });
  }
  // loadProducts(category: string | null) {
  //   if (category) {
  //     this.productDataStrSrv.getAllProduct(category).subscribe((response) => {
  //       if (Array.isArray(response?.data)) {
  //         this.recommendedProducts =
  //           response?.data?.filter(
  //             (x: Course) => x.documentId !== this.product?.documentId
  //           ) ?? undefined;
  //       }
  //       this.isLoading = false;
  //     });
  //   }
  // }
}

import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { Course } from '../../product.interface';
import { ProductDataStorageService } from '../../services/product-data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductListComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  private _productDataStrSrv = inject(ProductDataStorageService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  products!: Course[];

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      if (!params['category'] || params['category'] == 'ALL') {
        this._productDataStrSrv.getAllProduct().subscribe((response) => {
          this.products = response?.data ?? [];
        });
      } else {
        this._productDataStrSrv
          .filterProductsByCategory(params['category'])
          .subscribe((response) => {
            this.products = response?.data ?? [];
          });
      }
    });
  }

  setFilter(categoryId: string) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { category: categoryId },
      queryParamsHandling: 'merge',
    });
  }
  isActive(categoryId: string): boolean {
    return (
      this._route.snapshot.queryParams['category'] === categoryId ||
      (categoryId === 'ALL' && !this._route.snapshot.queryParams['category'])
    );
  }

  categories = [
    { id: 'ALL', name: 'All Gear', color: 'bg-accent-light' },
    { id: 'MICE', name: 'Gaming Mice', color: 'bg-purple-500' },
    { id: 'KEYBOARDS', name: 'Mechanical Keyboards', color: 'bg-amber-500' },
    { id: 'PCS', name: 'Custom PCs', color: 'bg-red-500' },
    { id: 'LAPTOPS', name: 'Gaming Laptops', color: 'bg-emerald-500' },
    { id: 'ESPORTS', name: 'Esports Gear', color: 'bg-cyan-500' },
  ];
}

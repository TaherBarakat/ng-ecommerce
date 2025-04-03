import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { ProductDataStorageService } from '../product/services/product-data-storage.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  productDataStrSrc = inject(ProductDataStorageService);
  ngOnInit(): void {
    this.productDataStrSrc.getAllProduct().subscribe((x) => console.log(x));
  }
}

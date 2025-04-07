import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Course, StrapiResponse } from '../product.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductDataStorageService {
  baseURL = environment.BASE_STRAPI_URL;
  constructor() {}
  httpSrv = inject(HttpClient);
  getAllProduct(): Observable<StrapiResponse<Course[]>> {
    return this.httpSrv.get<StrapiResponse<Course[]>>(
      this.baseURL + '/products?populate=*'
    );
  }
  getProductById(documentId: string) {
    return this.httpSrv.get<StrapiResponse<Course>>(
      this.baseURL + '/products/' + documentId + '?populate=*'
    );
  }
  filterProductsByCategory(category: string) {
    return this.httpSrv.get<StrapiResponse<Course[]>>(
      this.baseURL +
        '/products?filters[category][$eq]=' +
        category +
        '&populate=*'
    );
  }
}

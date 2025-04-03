import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ProductDataStorageService {
  baseURL = environment.BASE_STRAPI_URL;
  constructor() {}
  httpSrv = inject(HttpClient);
  getAllProduct() {
    return this.httpSrv.get(this.baseURL + '/products');
  }
}

import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ICarts, IPostCartReqBody } from '../cart.interface';
import { StrapiResponse } from '../../product/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartDataStorageService {
  baseURL = environment.BASE_STRAPI_URL;
  // constructor() {}
  httpSrv = inject(HttpClient);
  postCart(reqBody: IPostCartReqBody) {
    return this.httpSrv.post(this.baseURL + '/carts', reqBody);
  }
  getCarts(userEmail: string) {
    let filterQueryPram = '&filters[Email][$eq]=' + userEmail;
    return this.httpSrv.get<StrapiResponse<ICarts[]>>(
      `${this.baseURL}/carts?populate[products][populate]=banner${filterQueryPram}`
    );
    // localhost:1337/ap/carts/
  }
  deleteCart() {}
}

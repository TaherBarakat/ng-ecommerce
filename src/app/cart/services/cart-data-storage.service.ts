import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IPostCartReqBody } from '../cart.interface';

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
    return this.httpSrv.get(
      `${this.baseURL}/carts?populate[products][populate]=banner${filterQueryPram}`
    );
    // localhost:1337/ap/carts/
  }
}

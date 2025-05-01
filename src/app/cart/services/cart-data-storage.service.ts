import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ICarts, IPostCartReqBody } from '../cart.interface';
import { StrapiResponse } from '../../product/product.interface';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartDataStorageService {
  private baseURL = environment.BASE_STRAPI_URL;
  private httpSrv = inject(HttpClient);
  private authSrv = inject(AuthService);

  initCart() {
    // console.log('init      Cart');
    let products = {
      connect: [],
    };
    let userData = this.authSrv.getUsernameAndEmail;

    let postCartReqBody: IPostCartReqBody = {
      data: { products, ...userData },
    };
    return this.httpSrv.post(this.baseURL + '/carts', postCartReqBody);
  }

  getCart(userEmail: string) {
    let filterQueryPram = '&filters[Email][$eq]=' + userEmail;
    return this.httpSrv
      .get<StrapiResponse<ICarts[]>>(
        `${this.baseURL}/carts?populate[products][populate]=banner${filterQueryPram}`
      )
      .pipe(
        map((resp: StrapiResponse<ICarts[]>) => {
          return { data: resp.data[0], meta: resp.meta };
        })
      );
    // localhost:1337/ap/carts/
  }

  postToCart(reqBody: any, documentId: string) {
    console.log(reqBody);
    return this.httpSrv.put(this.baseURL + '/carts/' + documentId, reqBody);
  }

  deleteCartItem(documentId: string) {
    return this.httpSrv.delete(this.baseURL + '/carts/' + documentId);
  }
}

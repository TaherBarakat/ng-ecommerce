import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PaymentIntent } from '@stripe/stripe-js';
import { CartService } from '../../cart/services/cart.service';
import { environment } from '../../../environments/environment.development';
import { Currency } from 'lucide-angular';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly apiUrl =
    environment.BASE_STRAPI_URL + '/payments/create-intent';

  private cartSrv = inject(CartService);
  private http = inject(HttpClient);

  // totalAmount = this.cartSrv.totalAmount;

  createPaymentIntent(): Observable<{ clientSecret: string }> {
    let amount = this.cartSrv.totalAmount;
    return this.http
      .post<{ clientSecret: string }>(this.apiUrl, {
        amount: amount,
        currency: 'usd',
      })
      .pipe(tap((resp) => console.log(resp)));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PaymentIntent } from '@stripe/stripe-js';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly apiUrl = 'http://localhost:1337/api/payments/create-intent';

  constructor(private readonly http: HttpClient) {}

  createPaymentIntent(
    amount: number,
    currency: string
  ): Observable<{ clientSecret: string }> {
    return this.http
      .post<{ clientSecret: string }>(this.apiUrl, {
        amount,
        currency,
      })
      .pipe(tap((resp) => console.log(resp)));
  }
}

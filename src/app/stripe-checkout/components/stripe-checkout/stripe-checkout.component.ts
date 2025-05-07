import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  StripePaymentElementComponent,
  StripeElementsDirective,
  injectStripe,
} from 'ngx-stripe';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment.development';
import { PaymentService } from '../../services/payment.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-stripe-checkout',
  standalone: true,
  imports: [
    // CommonModule,
    StripeElementsDirective,
    // StripeCardComponent,
    ReactiveFormsModule,
    NgIf,
    CurrencyPipe,
    StripePaymentElementComponent,
    SpinnerComponent,
  ],
  templateUrl: './stripe-checkout.component.html',
  styleUrl: './stripe-checkout.component.css',
})
export class StripeCheckoutComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(FormBuilder);
  private paymentService = inject(PaymentService);
  private cartService = inject(CartService);

  readonly stripe = injectStripe(environment.STRIPE_PUBLISHABLE_kEY);

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    zipcode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.pattern(/\d+/)]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        colorPrimary: '#673ab7',
      },
    },
  };

  paying = signal(false);
  paymentSuccess = signal(false);
  paymentError = signal('');

  ngOnInit() {
    // const amount = this.cartService.totalAmount;

    this.paymentService.createPaymentIntent().subscribe(({ clientSecret }) => {
      this.elementsOptions.clientSecret = clientSecret;
    });
  }

  get amount() {
    this.checkoutForm.get('amount')?.patchValue(this.cartService.totalAmount);

    const amountValue = this.checkoutForm.get('amount')?.value;
    if (!amountValue || amountValue < 0) return 0;
    return amountValue;
  }

  clear() {
    this.checkoutForm.reset();
    this.paymentError.set('');
  }

  collectPayment() {
    if (this.paying() || this.checkoutForm.invalid) return;
    this.paying.set(true);
    this.paymentError.set('');

    const { name, email, address, zipcode, city } =
      this.checkoutForm.getRawValue();

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address as string,
                postal_code: zipcode as string,
                city: city as string,
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe((result) => {
        this.paying.set(false);
        if (result.error) {
          this.paymentError.set(result.error.message || 'Payment failed');
        } else if (result.paymentIntent?.status === 'succeeded') {
          this.paymentSuccess.set(true);
          this.cartService.resetCart();
        }
      });
  }
}

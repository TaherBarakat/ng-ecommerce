import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailsPageComponent } from './product/components/product-details-page/product-details-page.component';
import { AuthPageComponent } from './auth/components/auth-page/auth-page.component';
import { ProductPageComponent } from './product/components/product-page/product-page.component';
import { CartPageComponent } from './cart/components/cart/cart-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products/:documentId', component: ProductDetailsPageComponent },

  { path: 'products', component: ProductPageComponent },
  // { path: 'projects', component:  },
  { path: 'cart', component: CartPageComponent },
  { path: 'about-us', component: HomePageComponent },
  { path: 'auth/:mode', component: AuthPageComponent },
];

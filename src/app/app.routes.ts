import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailsPageComponent } from './product/components/product-details-page/product-details-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'product/:id', component: ProductDetailsPageComponent },

  { path: 'explore', component: HomePageComponent },
  { path: 'projects', component: HomePageComponent },
  { path: 'about-us', component: HomePageComponent },
];

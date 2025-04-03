import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'explore', component: HomePageComponent },
  { path: 'projects', component: HomePageComponent },
  { path: 'about-us', component: HomePageComponent },
];

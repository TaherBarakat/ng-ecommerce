import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ClerkService } from 'ngx-clerk';
import { environment } from '../environments/environment.development';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private _clerk: ClerkService) {
    this._clerk.__init({
      publishableKey: environment.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    });
  }

  // title = 'ng-ecommerce';
}

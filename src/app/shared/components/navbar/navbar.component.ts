import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import {
  ClerkService,
  ClerkUserButtonComponent,
  ClerkUserProfileComponent,
} from 'ngx-clerk';
import { UndoIcon } from 'lucide-angular';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ClerkUserButtonComponent, AsyncPipe, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authSrv = inject(AuthService);
  clerkSrv = inject(ClerkService);
  // .subscribe((user) => {
  // isUserLoggedIn$ = this.authSrv.isUserLoggedIn;
  isUserLoggedIn$ = this.clerkSrv.user$;

  // ngOnInit() {
  //   console.log(this.isLoggedInMode);
  //   this.authSrv.isUserLoggedIn.subscribe((isUserLoggedIn) => {
  //     console.log('isLoggedIn temp', this.isLoggedInMode);
  //     console.log('isLoggedIn clerck', isUserLoggedIn);
  //     this.isLoggedInMode = isUserLoggedIn;
  //   });
  // }
}

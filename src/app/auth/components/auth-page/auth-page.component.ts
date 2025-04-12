import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Router } from 'ang'
import {
  ClerkService,
  ClerkSignInComponent,
  ClerkSignUpComponent,
} from 'ngx-clerk';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Subscript, UndoIcon } from 'lucide-angular';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ClerkSignInComponent, ClerkSignUpComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  clerkSrv = inject(ClerkService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  authSrv = inject(AuthService);
  authMode: string = '';

  userSub: Subscription | undefined;

  ngOnInit() {
    console.log('init the auth page');
    this.setMode();

    this.userSub = this.authSrv.currentUser.subscribe((user) => {
      if (user && this.route.snapshot.url[0].path == 'auth')
        this.goToTheHomePage();
    });

    this.clerkSrv.user$.subscribe((user) => {
      this.authSrv.isUserLoggedIn.next(user ? true : false);
      this.authSrv.currentUser.next(user ?? undefined);
    });
  }

  setMode() {
    this.route.params.subscribe((params) => {
      this.authMode = params['mode'];
    });
  }
  goToTheHomePage() {
    console.log('go home');
    this.router.navigate(['']);
  }
  ngOnDestroy() {
    console.log('destroy');

    this.userSub?.unsubscribe();
  }
}

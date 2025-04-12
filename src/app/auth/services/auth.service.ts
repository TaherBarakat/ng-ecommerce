import { Injectable } from '@angular/core';
import { ClerkService } from 'ngx-clerk';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private clerkSrv: ClerkService) {
    this.clerkSrv.user$.subscribe((user) => {
      this.isUserLoggedIn.next(user ? true : false);
      this.currentUser.next(user ?? undefined);
    });
  }
  isUserLoggedIn = new BehaviorSubject(false);
  currentUser: BehaviorSubject<any | undefined> = new BehaviorSubject(
    undefined
  );
}

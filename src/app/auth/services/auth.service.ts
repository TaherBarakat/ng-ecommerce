import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn = new BehaviorSubject(false)=;
  currentUser: BehaviorSubject<any | undefined> = new BehaviorSubject(
    undefined
  );
}

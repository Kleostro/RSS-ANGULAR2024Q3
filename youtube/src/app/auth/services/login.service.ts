import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import LocalStorageService, { STORE_KEYS } from '../../core/services/local-storage.service';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export default class LoginService {
  private localStorageService = inject(LocalStorageService);

  private router: Router = inject(Router);

  private isLoginSubject = new BehaviorSubject<boolean>(!!this.localStorageService.get(STORE_KEYS.USER_TOKEN));

  isLogin$ = this.isLoginSubject.asObservable();

  login(props: User) {
    this.localStorageService.add(STORE_KEYS.USER_LOGIN, JSON.stringify(props));
    this.localStorageService.add(STORE_KEYS.USER_TOKEN, JSON.stringify(crypto.randomUUID()));
    this.isLoginSubject.next(true);
    this.router.navigate(['/main']);
  }

  logout() {
    this.localStorageService.clear();
    this.isLoginSubject.next(false);
    this.router.navigate(['/login']);
  }

  getUserLogin() {
    return this.localStorageService.get<User>(STORE_KEYS.USER_LOGIN)?.login;
  }

  isUserLogin(): boolean {
    return this.isLoginSubject.value;
  }
}

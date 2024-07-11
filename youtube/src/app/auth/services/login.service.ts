import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import LocalStorageService, { STORE_KEYS } from '../../core/services/local-storage.service';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export default class LoginService {
  localStorageService = inject(LocalStorageService);

  router: Router = inject(Router);

  isLogin = new BehaviorSubject<boolean>(!!this.localStorageService.get(STORE_KEYS.USER_TOKEN));

  login(props: User) {
    this.localStorageService.add(STORE_KEYS.USER_LOGIN, JSON.stringify(props));
    this.localStorageService.add(STORE_KEYS.USER_TOKEN, JSON.stringify(crypto.randomUUID()));
    this.isLogin.next(true);
    this.router.navigate(['/main']);
  }

  logout() {
    this.localStorageService.clear();
    this.isLogin.next(false);
    this.router.navigate(['/login']);
  }

  getUserLogin() {
    return this.localStorageService.get<User>(STORE_KEYS.USER_LOGIN)?.login;
  }

  isUserLogin(): boolean {
    return !!this.isLogin.value;
  }
}

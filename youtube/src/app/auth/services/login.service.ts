import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import STORE_KEYS from '../../core/constants/store';
import LocalStorageService from '../../core/services/local-storage.service';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export default class LoginService {
  private localStorageService = inject(LocalStorageService);

  private router: Router = inject(Router);

  private isLogin$ = of(!!this.localStorageService.getValueByKey(STORE_KEYS.USER_TOKEN));

  login(props: User) {
    this.localStorageService.addValue(STORE_KEYS.USER_LOGIN, props);
    this.localStorageService.addValue(STORE_KEYS.USER_TOKEN, crypto.randomUUID());
    this.isLogin$ = of(true);
    this.router.navigate(['/main']);
  }

  logout() {
    this.localStorageService.clear();
    this.isLogin$ = of(false);
    this.router.navigate(['/login']);
  }

  getIsLogin() {
    return this.isLogin$;
  }

  getUserLogin() {
    return this.localStorageService.getValueByKey<User>(STORE_KEYS.USER_LOGIN)?.login;
  }

  isUserLogin(): boolean {
    return !!this.localStorageService.getValueByKey(STORE_KEYS.USER_TOKEN);
  }
}

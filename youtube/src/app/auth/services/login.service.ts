import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import STORE_KEYS from '../../core/constants/store';
import LocalStorageService from '../../core/services/local-storage.service';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export default class LoginService {
  private localStorageService = inject(LocalStorageService);

  private router: Router = inject(Router);

  private isLogin$ = new BehaviorSubject(!!this.localStorageService.getValueByKey(STORE_KEYS.USER_TOKEN));

  private userName$ = new BehaviorSubject(
    this.localStorageService.getValueByKey<User>(STORE_KEYS.USER_LOGIN)?.login || '',
  );

  login(props: User) {
    this.localStorageService.addValue(STORE_KEYS.USER_LOGIN, props);
    this.localStorageService.addValue(STORE_KEYS.USER_TOKEN, crypto.randomUUID());
    this.userName$.next(props.login);
    this.isLogin$.next(true);
    this.router.navigate(['/main']);
  }

  logout() {
    this.localStorageService.clear();
    this.userName$.next('');
    this.isLogin$.next(false);
    this.router.navigate(['/login']);
  }

  getIsLogin() {
    return this.isLogin$;
  }

  getUserName() {
    return this.userName$;
  }

  isUserLogin(): boolean {
    return !!this.localStorageService.getValueByKey(STORE_KEYS.USER_TOKEN);
  }
}

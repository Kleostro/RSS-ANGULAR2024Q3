import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import LocalStorageService, { STORE_KEYS } from '../../core/services/local-storage.service';

const loginGuard: CanActivateFn = () => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  if (localStorageService.get(STORE_KEYS.USER_TOKEN) === undefined) {
    router.navigate(['login']);
    return false;
  }

  return true;
};

export default loginGuard;

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import LoginService from '../services/login.service';

const loginGuard: CanActivateFn = () => inject(LoginService).isUserLogin() || inject(Router).navigate(['login']);

export default loginGuard;

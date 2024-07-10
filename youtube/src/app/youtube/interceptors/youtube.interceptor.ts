import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import ENVIRONMENTS from '../../../environment/environment';

const youtubeInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const modifiedReq = req.clone({
    setParams: { key: ENVIRONMENTS.API_KEY },
    url: ENVIRONMENTS.API_BASE_URL + req.url,
  });

  return next(modifiedReq);
};

export default youtubeInterceptor;

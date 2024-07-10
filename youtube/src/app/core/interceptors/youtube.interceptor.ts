import { HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import ENVIRONMENTS from '../../../environment/environment';

class YoutubeInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    const modifiedRequest = req.clone({
      setParams: { key: ENVIRONMENTS.API_KEY },
      url: ENVIRONMENTS.API_BASE_URL + req.url,
    });

    return next.handle(modifiedRequest);
  }
}

const youtubeInterceptor = { provide: HTTP_INTERCEPTORS, useClass: YoutubeInterceptor, multi: true };

export default youtubeInterceptor;

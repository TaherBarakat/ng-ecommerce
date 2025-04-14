import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request and add the API key as a header
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + environment.API_KEY),
  });

  // Send the newly created request with the API key
  return next(authReq);
};

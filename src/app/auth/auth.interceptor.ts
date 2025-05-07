import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const authReq = req.clone({
  //   headers: req.headers.set('Authorization', 'Bearer ' + environment.API_KEY),
  // });

  // return next(authReq);
  return next(req);
};

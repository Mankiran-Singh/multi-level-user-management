import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request to add withCredentials globally
  const clonedReq = req.clone({
    withCredentials: true
  });

  return next(clonedReq);
};
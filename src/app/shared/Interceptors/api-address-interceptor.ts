// src/app/shared/interceptors/api-address-interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { ApiAddressUtilities } from '../utilities/apiAddressUtilities';

export const apiAddressInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('http')) {
    const modifiedReq = req.clone({ url: `${ApiAddressUtilities.baseAddress}${req.url}` });
    return next(modifiedReq);
  }
  return next(req);
};


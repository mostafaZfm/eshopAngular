import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiAddressInterceptor } from './shared/Interceptors/api-address-interceptor';
import { authInterceptor } from './shared/Interceptors/auth-interceptor-interceptor';
import {provideToastr} from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiAddressInterceptor, authInterceptor])
    ),
    provideToastr({ positionClass: 'toast-bottom-right' })

  ]
};

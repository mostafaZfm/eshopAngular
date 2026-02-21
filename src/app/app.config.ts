import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiAddressInterceptor } from './shared/Interceptors/api-address-interceptor';
import { authInterceptor } from './shared/Interceptors/auth-interceptor-interceptor';
import {provideToastr} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiAddressInterceptor, authInterceptor])
    ),

  ]
};

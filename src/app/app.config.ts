import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { routes } from './app.routes';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideHttpClient ,withInterceptors,withFetch} from '@angular/common/http';
import { jwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    provideClientHydration(withNoHttpTransferCache()),
    provideHttpClient(
      withFetch(), 
      withInterceptors([jwtInterceptor])
    ),
    importProvidersFrom(
      LucideAngularModule.pick(icons) 
    ),
  ]
};

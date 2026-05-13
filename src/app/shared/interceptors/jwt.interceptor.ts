import { HttpInterceptorFn } from '@angular/common/http';
import { inject,PLATFORM_ID } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { platformBrowser } from '@angular/platform-browser'; 
import { isPlatformBrowser } from '@angular/common';
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId= inject(PLATFORM_ID);
  const token = authService.getToken();

  if(!isPlatformBrowser(platformId)){
    return next(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError(error => {

      if (error.status === 401) {
        authService.logout();
        router.navigate(['/signin']);
      }
      return throwError(() => error);
    })
  );
};
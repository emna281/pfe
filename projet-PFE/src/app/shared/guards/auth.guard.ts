import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }
  if (authService.isLoggedIn()) {
    return true;
  }

  // Sauvegarder l'URL demandée pour rediriger après login
  router.navigate(['/signin'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

// Guard pour les routes ADMIN seulement
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  } 
  if (!authService.isLoggedIn()) {
    router.navigate(['/signin']);
    return false;
  }

  if (!authService.hasRole('ADMIN')) {
    const role = authService.getRole();
    if (role) {
      authService.redirectByRole(role);
    } else {
      router.navigate(['/signin']);
    }
    return false;
  }

  return true;
};

export const planificateurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  } 
  if (!authService.isLoggedIn()) {
    router.navigate(['/signin']);
    return false;
  }

  if (!authService.hasRole('PLANIFICATEUR')) {
    const role = authService.getRole();
    if (role) {
      authService.redirectByRole(role);
    } else {
      router.navigate(['/signin']);
    }
    return false;
  }

  return true;
};

export const financierGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  } 
  if (!authService.isLoggedIn()) {
    router.navigate(['/signin']);
    return false;
  }

  if (!authService.hasRole('FINANCIER')) {
    const role = authService.getRole();
    if (role) {
      authService.redirectByRole(role);
    } else {
      router.navigate(['/signin']);
    }
    return false;
  }

  return true;
};

export const apprenantGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  } 
  if (!authService.isLoggedIn()) {
    router.navigate(['/signin']);
    return false;
  }

  if (!authService.hasRole('APPRENANT')) {
    const role = authService.getRole();
    if (role) {
      authService.redirectByRole(role);
    } else {
      router.navigate(['/signin']);
    }
    return false;
  }

  return true;
};
export const formateurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  } 
  if (!authService.isLoggedIn()) {
    router.navigate(['/signin']);
    return false;
  }

  if (!authService.hasRole('FORMATEUR')) {
    const role = authService.getRole();
    if (role) {
      authService.redirectByRole(role);
    } else {
      router.navigate(['/signin']);
    }
    return false;
  }

  return true;
};
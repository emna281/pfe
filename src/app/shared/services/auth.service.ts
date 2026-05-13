import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from 'rxjs';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface SignupRequest {
  email: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  telephone?: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  nom: string;
  prenom: string;
  email: string;
  id: number;
}
export interface BaseUser {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  actif:boolean;
  role: UserRole;
  dateCreation: string | Date;
}
export interface Planificateur extends BaseUser {
  specialite: string;
  anneesExperience: number;
  cvPath: string[];
  role: 'PLANIFICATEUR';
}
export interface Manager extends BaseUser {
  specialite: string;
  anneesExperience: number;
  cvPath: string[];
  role: 'MANAGER';
}
export interface Financier extends BaseUser {
  specialite: string;
  anneesExperience: number;
  cvPath: string[];
  role: 'FINANCIER';
}
export interface Formateur  extends BaseUser {
  specialite: string;
  anneesExperience: number;
  cvPath: string[];
  noteMoyenne: number;
  heuresEnseigneesTotal:number;
  disponibilite:boolean;
  sessions : string[];
  competences : string [];
  role: 'FORMATEUR';
}
export interface Apprenant  extends BaseUser {
  posteActuel: string;
  niveauEtude: string;
  inscriptions : string[];
  role: 'APPRENANT';
}
export type statusUtilisateur = 'ACTIF'|'INACTIF'  ;  

export type UserRole = 'FORMATEUR'|'APPRENANT'|  'ADMIN'| 'PLANIFICATEUR'| 'MANAGER'| 'FINANCIER';
@Injectable({ providedIn: 'root' })

export class AuthService {
    private tokenKey='auth_token';
    private api = 'http://localhost:8081/api/auth';
    private platformId = inject(PLATFORM_ID);
    constructor(private router:Router,private http:HttpClient){}
    

    login(request: LoginRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.api}/login`, request).pipe(
      tap(response => {
        this.saveSession(response);
      })
    );
  }


  signup(request: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.api}/signup/apprenant`, request
    ).pipe(
      tap(response => this.saveSession(response))
    );
  }

  // ── Vérifier token côté backend
  verifierConnexion(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.api}/me`);
  }

  // ── Sauvegarder session après login/signup
  private saveSession(response: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)){
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
    }
  }

  // ── Récupérer le token
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)){
      return localStorage.getItem('token');
    }
    return null;
  }

  // ── Récupérer l'utilisateur connecté
  getUser(): AuthResponse | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // ── Vérifier si connecté (vérifie expiration token)
  isLoggedIn(): boolean {
    const token = this.getToken();
    console.log('TOKEN:', token);
    if (!token){
      console.log('❌ Pas de token');
      return false;
    } 
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('PAYLOAD:', payload);
      console.log('EXP:', new Date(payload.exp * 1000));
      console.log('NOW:', new Date());
      console.log('VALIDE:', payload.exp * 1000 > Date.now());
      return payload.exp * 1000 > Date.now();
    } catch(e) {
      console.log('❌ Erreur décodage:', e);
      return false;
    }
  }

  // ── Récupérer le rôle
  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  // ── Vérifier rôle
  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  // ── Déconnexion
  logout(): void {
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/signin']);
    }
  }

  redirectByRole(role:string):void{
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/admin/adminDashboard']);
        break;
      case 'FINANCIER':
        this.router.navigate(['/financier/financierDashboard']);
        break;
      case 'PLANIFICATEUR':
        this.router.navigate(['/planificateur/planificateurDashboard']);
        break;
      case 'FORMATEUR':
        this.router.navigate(['/formateur/profilFormateur']);
        break;
      case 'APPRENANT':
      default:
        this.router.navigate(['/espace-apprenant/profilApprenant']);
    }
  }
}
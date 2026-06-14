import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup-form-accueil',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './signup-form-accueil.html',
  styleUrl: './signup-form-accueil.css',
})
export class SignupFormAccueil {
  showPassword = false;
  isChecked = false;

  nom = '';
  prenom = '';
  email = '';
  motDePasse = '';
  telephone = '';
  loading = false;
  errorMsg = '';
  constructor(private router :Router,private authService:AuthService){}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    if (!this.nom || !this.prenom || !this.email || !this.motDePasse) {
      this.errorMsg = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    if (this.motDePasse.length < 6) {
      this.errorMsg = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.signup({
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      motDePasse: this.motDePasse,
      telephone: this.telephone
    }).subscribe({
      next: () => {
        this.loading = false;
        // Connecté directement après signup → rediriger vers apprenant
        this.router.navigate(['/apprenant']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error || 'Erreur lors de la création du compte';
      }
    });
  }

}

import { Component } from '@angular/core';
import { Label } from '../../input/label/label';
import { CheckboxComponent } from '../../ui/checkbox.component';
import { Boutton } from '../../button/boutton/boutton';
import { InputFieldComponent } from '../../ui/input-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin-form',
  imports: [Label,CheckboxComponent,Boutton,RouterModule,FormsModule,CommonModule],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css',
})
export class SigninForm {
  showPassword = false;
  isChecked = false;
  loading=false;
  email = '';
  motDePasse = '';
  errorMsg:string=''  
  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute){}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    if (!this.email || !this.motDePasse) {
      this.errorMsg = 'Veuillez remplir tous les champs obligatoires';
      return;
    }
    if (this.motDePasse.length < 6) {
      this.errorMsg = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.login({
      email: this.email,
      motDePasse: this.motDePasse,
    }).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('✅ ROLE reçu:', response.role);          // valeur exacte du backend
  console.log('✅ USER stocké:', this.authService.getUser()); // bien sauvegardé ?
  console.log('✅ hasRole ADMIN:', this.authService.hasRole('ADMIN'));
        const returnUrl=this.route.snapshot.queryParams['returnUrl'];
        if(returnUrl){
          this.router.navigateByUrl(returnUrl);
        }else{
          this.authService.redirectByRole(response.role);
        }
        
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.message || err.error || 'Erreur lors de la connexion';
      }
    });
  }
  

}
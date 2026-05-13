import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormulaireSignup } from '../formulaire-signup/formulaire-signup';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  standalone: true, 
  imports: [CommonModule, FormulaireSignup,FormsModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm {
}

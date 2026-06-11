import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableFacture } from '../../../shared/components/tables/table-facture/table-facture';

@Component({
  selector: 'app-facture',
  imports: [CommonModule,TableFacture],
  templateUrl: './facture.html',
  styleUrl: './facture.css',
})
export class Facture {

}

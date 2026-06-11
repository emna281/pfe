import { Component ,Input} from '@angular/core';
import { BaseUser } from '../../../../services/auth.service';

@Component({
  selector: 'app-apprenant-card',
  imports: [],
  templateUrl: './apprenant-card.html',
  styleUrl: './apprenant-card.css',
})
export class ApprenantCard {
  @Input() user!:BaseUser;
  activeTab='planing';
  tabs=[
    {key:'planing',label:'Planing'},
    {key:'paiement',label:'Paiement'},
    {key:'presence',label:'Presence'}
  ]

}

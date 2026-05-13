import { CommonModule } from '@angular/common';
import { Component ,Input,Output,EventEmitter,OnInit} from '@angular/core';
import { BaseUser } from '../../../services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { Phone } from 'lucide-angular';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';
export interface ExtraField {
  label: string;
  value: string;
}
@Component({
  selector: 'app-user-card',
  imports: [CommonModule,LucideAngularModule,RouterModule],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
   @Input() user!: BaseUser;           
  @Input() extraFields?: ExtraField[];

  @Output() cardClicked = new EventEmitter<BaseUser>(); 
  readonly Phone=Phone;
  constructor(private router:Router){}
  ngOnInit() {
    console.log('dateCreation:', this.user.dateCreation, typeof this.user.dateCreation);
  }
  onClick(): void {
    this.cardClicked.emit(this.user);
  }

  getRandomColor(name: string): string {
  const colors = [
    'bg-violet-100 text-violet-600',
    'bg-gray-100 text-black-600',
    'bg-blue-100 text-blue-600',
    'bg-yellow-100 text-yellow-600',
    'bg-pink-100 text-pink-600',
    'bg-indigo-100 text-indigo-600'
  ];

  let index = 0;
  for (let i = 0; i < name.length; i++) {
    index += name.charCodeAt(i);
  }

  return colors[index % colors.length];
}

navigateToProfile(event:MouseEvent):void{
  event.stopPropagation();
  this.router.navigate(['admin/profileAdmin'],{
    queryParams:{id:this.user.id}
  });
}

}

import { Component ,Input,Output,EventEmitter} from '@angular/core';
import { BaseUser } from '../../../services/auth.service';
import { ExtraField, UserCard } from '../user-card/user-card';
import { CommonModule } from '@angular/common';
import { UserListHeader } from '../user-list-header/user-list-header';
import { RouterModule } from '@angular/router';


export interface UserListConfig {
  title: string;        
  addLabel: string;      
  filterLabel: string;  
  filterPlaceholder?: string;
}
@Component({
  selector: 'app-user-list-page',
  imports: [UserCard,CommonModule,UserListHeader,RouterModule],
  standalone: true,
  templateUrl: './user-list-page.html',
  styleUrl: './user-list-page.css',
})
export class UserListPage {
  @Input() config!: UserListConfig;   
  @Input() users: BaseUser[] | null = null;    
  @Input() loading: boolean = false;
  @Input() totalCount: number = 0;    
  @Input() getExtraFields: (user: BaseUser) => ExtraField[] = () => [];
 
  @Output() userClicked    = new EventEmitter<BaseUser>(); 
  @Output() addClicked     = new EventEmitter<void>();     
  @Output() filterChanged  = new EventEmitter<string>();   

  
  searchTerm: string = '';
  get filteredUsers(): BaseUser[] {
    if (!this.users) return []; 
    if (!this.searchTerm) return this.users;
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(u =>
      u.nom.toLowerCase().includes(term) ||
      u.prenom.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    );
  }

  onUserClicked(user: BaseUser): void {
    this.userClicked.emit(user);
  }

  onAddClicked(): void {
    this.addClicked.emit();
  }
  onFilterChanged(term: string): void {
    this.searchTerm = term;
    this.filterChanged.emit(term);
  }
  trackById(_index: number, user: BaseUser): string {
    return user.id;
  }

  
}

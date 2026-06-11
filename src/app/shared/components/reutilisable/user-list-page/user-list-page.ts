import { Component ,Input,Output,EventEmitter, ChangeDetectorRef} from '@angular/core';
import { BaseUser } from '../../../services/auth.service';
import { ExtraField } from '../user-card/user-card';
import { CommonModule } from '@angular/common';
import { UserListHeader } from '../user-list-header/user-list-header';
import { Router, RouterModule } from '@angular/router';


export interface UserListConfig {
  title: string;        
  addLabel: string;      
  filterLabel: string;  
  filterPlaceholder?: string;
}
@Component({
  selector: 'app-user-list-page',
  imports: [CommonModule,UserListHeader,RouterModule],
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

  constructor(private cdr:ChangeDetectorRef,private router:Router){}
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
  getAvatarColor(name: string): string {
  const colors = [
    'bg-violet-100 text-violet-600',
    'bg-blue-100 text-blue-600',
    'bg-yellow-100 text-yellow-600',
    'bg-pink-100 text-pink-600',
    'bg-indigo-100 text-indigo-600',
    'bg-gray-100 text-gray-600'
  ];
  let index = 0;
  for (let i = 0; i < name.length; i++) index += name.charCodeAt(i);
  return colors[index % colors.length];
}

navigateToProfile(user: BaseUser): void {
  // adapte la route selon ton app
  this.router.navigate(['admin/profileAdmin'], { queryParams: { id: user.id } });
}

  
}

import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserListConfig } from '../user-list-page/user-list-page';

@Component({
  selector: 'app-user-list-header',
  imports: [CommonModule],
  templateUrl: './user-list-header.html',
  styleUrl: './user-list-header.css',
})
export class UserListHeader implements OnDestroy{
  @Input() config!: UserListConfig;
  @Input() totalCount: number = 0;

  @Output() addClicked    = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<string>();

  searchValue = '';
  private searchSubject = new Subject<string>();
  private destroy$      = new Subject<void>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => this.filterChanged.emit(term));
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value;
    this.searchSubject.next(value);
  }

  onAddClick(): void {
    this.addClicked.emit();
  }

  clearSearch(): void {
    this.searchValue = '';
    this.searchSubject.next('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100
                dark:border-gray-800 shadow-sm p-6
                hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center justify-between mb-4">
        <!-- Icône -->
        <div class="w-10 h-10 rounded-xl flex items-center justify-center"
             [ngClass]="iconBg">
          <lucide-icon [name]="icon" class="w-5 h-5" [ngClass]="iconColor" />
        </div>
        <!-- Trend -->
        <span *ngIf="trend"
              class="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
              [ngClass]="trend >= 0
                ? 'text-green-700 bg-green-50'
                : 'text-red-700 bg-red-50'">
          <lucide-icon [name]="trend >= 0 ? 'trending-up' : 'trending-down'"
                       class="w-3 h-3"/>
          {{ trend >= 0 ? '+' : '' }}{{ trend }}%
        </span>
      </div>
      <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ value }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ label }}</p>
    </div>
  `
})
export class StatCard {
  @Input() label: string = '';
  @Input() value: string | number = 0;
  @Input() icon: string = 'bar-chart-2';
  @Input() iconBg: string = 'bg-blue-50';
  @Input() iconColor: string = 'text-blue-500';
  @Input() trend?: number; // ex: +12 ou -5
}
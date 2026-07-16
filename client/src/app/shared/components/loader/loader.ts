import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading" class="w-full py-8 flex flex-col items-center justify-center">
      <!-- Spinner Type -->
      <div *ngIf="type === 'spinner'" class="flex flex-col items-center gap-3">
        <svg class="animate-spin h-10 w-10 text-[#4F46E5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-xs font-bold tracking-wider text-[#64748B] uppercase animate-pulse">Loading SprintFlow...</span>
      </div>

      <!-- Skeleton Type -->
      <div *ngIf="type === 'skeleton'" class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let i of [1, 2, 3]" class="neu-card p-6 flex flex-col justify-between min-h-[220px] animate-pulse">
          <div>
            <div class="flex items-center justify-between gap-4 mb-4">
              <div class="h-6 bg-[#d1d9e6] rounded w-2/3"></div>
              <div class="h-5 bg-[#d1d9e6] rounded w-16"></div>
            </div>
            <div class="space-y-2 mb-6">
              <div class="h-4 bg-[#d1d9e6] rounded w-full"></div>
              <div class="h-4 bg-[#d1d9e6] rounded w-5/6"></div>
            </div>
          </div>
          <div class="border-t border-[#d1d9e6] pt-4 flex items-center justify-between">
            <div class="h-5 bg-[#d1d9e6] rounded w-16"></div>
            <div class="h-5 bg-[#d1d9e6] rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Loader {
  @Input() loading = true;
  @Input() type: 'spinner' | 'skeleton' = 'spinner';
}

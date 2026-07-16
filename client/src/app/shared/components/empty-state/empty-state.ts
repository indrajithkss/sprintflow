import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="neu-card p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto mt-8">
      <div class="w-16 h-16 rounded-full bg-[#EEF2F7] flex items-center justify-center shadow-soft mb-6 text-[#64748B]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-8 h-8 text-[#4F46E5]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H9.75M9 18h3.375c.621 0 1.125-.504 1.125-1.125V15" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-[#1F2937]">{{ title }}</h3>
      <p class="text-sm text-[#64748B] mt-2 mb-8 px-4 leading-relaxed">{{ message }}</p>
      <button 
        (click)="onAction()"
        class="neu-button-primary py-3 px-6 flex items-center justify-center gap-2 font-bold text-sm tracking-wide shadow-soft"
      >
        <lucide-icon name="plus" size="14"></lucide-icon>
        <span>{{ buttonText }}</span>
      </button>
    </div>
  `
})
export class EmptyState {
  @Input() title = 'No Tasks Yet';
  @Input() message = 'Create your first task to start tracking your sprint velocity.';
  @Input() buttonText = 'New Task';

  @Output() action = new EventEmitter<void>();

  onAction() {
    this.action.emit();
  }
}

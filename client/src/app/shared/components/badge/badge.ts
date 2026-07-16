import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClass">
      <span class="w-1.5 h-1.5 rounded-full" [class]="dotClass"></span>
      {{ text }}
    </span>
  `
})
export class Badge {
  @Input() text = '';
  @Input() type = 'default';

  get badgeClass(): string {
    const base = 'neu-badge inline-flex items-center gap-1.5 py-1 px-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider ';
    switch (this.type) {
      case 'low':
      case 'completed':
        return base + 'text-[#22C55E] bg-[#22c55e14]';
      case 'medium':
      case 'in-progress':
        return base + 'text-[#F59E0B] bg-[#f59e0b14]';
      case 'high':
        return base + 'text-[#EF4444] bg-[#ef444514]';
      case 'todo':
        return base + 'text-[#4F46E5] bg-[#4f46e514]';
      default:
        return base + 'text-[#4B5563] bg-[#EEF2F7]';
    }
  }

  get dotClass(): string {
    switch (this.type) {
      case 'low':
      case 'completed':
        return 'bg-[#22C55E]';
      case 'medium':
      case 'in-progress':
        return 'bg-[#F59E0B]';
      case 'high':
        return 'bg-[#EF4444]';
      case 'todo':
        return 'bg-[#4F46E5]';
      default:
        return 'bg-[#4B5563]';
    }
  }
}

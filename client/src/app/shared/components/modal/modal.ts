import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="neu-modal-backdrop" (click)="onClose()">
      <div 
        class="neu-card w-full max-w-xl p-8 flex flex-col justify-between m-4 relative animate-slide-up"
        (click)="preventClose($event)"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between mb-6 border-b border-white/30 pb-4">
          <h2 class="text-xl font-bold text-[#1F2937]">{{ title }}</h2>
          <button 
            (click)="onClose()"
            class="neu-button p-2 flex items-center justify-center text-[#4B5563] hover:text-[#1F2937]"
            aria-label="Close"
          >
            <lucide-icon name="x" size="16"></lucide-icon>
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="flex-1 overflow-y-auto max-h-[70vh]">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() title = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }
}

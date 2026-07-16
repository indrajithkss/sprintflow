import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button[app-button], a[app-button]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`
})
export class Button {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ai' = 'secondary';
  @Input() customClass = '';

  @HostBinding('class')
  get hostClasses(): string {
    const base = 'font-bold text-sm tracking-wide transition-all duration-150 active:scale-95 disabled:opacity-50 inline-flex items-center justify-center ';
    const variantStyle = (() => {
      switch (this.variant) {
        case 'primary':
          return 'neu-button-primary';
        case 'danger':
          return 'neu-button text-[#EF4444] hover:bg-[#FEE2E2]';
        case 'ai':
          return 'neu-button-ai';
        case 'secondary':
        default:
          return 'neu-button';
      }
    })();
    return `${base} ${variantStyle} ${this.customClass}`;
  }
}

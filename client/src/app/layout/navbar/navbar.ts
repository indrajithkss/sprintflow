import { Component, Output, EventEmitter, signal, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <header class="w-full bg-[#EEF2F7] px-6 py-4 flex items-center justify-between border-b border-white/30 sticky top-0 z-20">
      
      <!-- Left: Mobile Menu Toggle -->
      <div class="flex items-center gap-4">
        <button 
          (click)="onMenuToggle()" 
          class="lg:hidden neu-button p-2.5 flex items-center justify-center text-[#64748B] hover:text-[#1F2937]"
          aria-label="Toggle Sidebar"
        >
          <lucide-icon name="layout-dashboard" size="18"></lucide-icon>
        </button>
      </div>

      <!-- Right: User panel -->
      <div class="flex items-center gap-4">
        <!-- Date Representation (hidden on small mobile) -->
        <span class="hidden md:inline text-xs font-semibold text-[#64748B] tracking-wide">
          {{ currentDate | date:'fullDate' }}
        </span>

        <!-- User Profile Dropdown -->
        <div class="relative profile-menu-container">
          <button 
            (click)="toggleProfile($event)"
            class="flex items-center gap-2 p-1.5 rounded-2xl bg-[#EEF2F7] shadow-soft active:scale-95 transition-all duration-150"
            aria-label="User profile"
          >
            <!-- Avatar -->
            <div class="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white font-extrabold text-xs shadow-soft-inset uppercase">
              {{ initials }}
            </div>
            <span class="hidden md:inline text-xs font-bold text-[#1F2937] pr-1 capitalize">{{ currentUser()?.name || 'SprintFlow User' }}</span>
          </button>

          <!-- Neumorphic Dropdown Menu -->
          <div 
            *ngIf="showProfileMenu()" 
            class="absolute right-0 mt-3 w-56 neu-card p-4 z-50 animate-slide-up"
            (click)="$event.stopPropagation()"
          >
            <!-- User Info Block -->
            <div class="flex items-center gap-3 mb-4 pb-3 border-b border-white/30">
              <div class="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white font-extrabold text-sm shadow-soft-inset uppercase">
                {{ initials }}
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-xs text-[#1F2937] capitalize">{{ currentUser()?.name || 'SprintFlow User' }}</span>
                <span class="text-[10px] text-[#64748B] truncate">{{ currentUser()?.email || 'user@sprintflow.ai' }}</span>
              </div>
            </div>

            <!-- Dropdown Options -->
            <div class="space-y-1">
              <button 
                (click)="onLogout()"
                class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#EF4444] hover:bg-[#FEE2E2] transition-colors text-left"
              >
                <lucide-icon name="log-out" size="14"></lucide-icon>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </header>
  `
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly elementRef = inject(ElementRef);

  @Output() logout = new EventEmitter<void>();
  @Output() menuToggle = new EventEmitter<void>();

  currentUser = this.authService.currentUser;

  get initials(): string {
    const name = this.currentUser()?.name || 'SprintFlow User';
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  currentDate = new Date();
  showProfileMenu = signal(false);

  onMenuToggle() {
    this.menuToggle.emit();
  }

  toggleProfile(event: MouseEvent) {
    event.stopPropagation();
    this.showProfileMenu.update(v => !v);
  }

  onLogout() {
    this.showProfileMenu.set(false);
    this.logout.emit();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showProfileMenu.set(false);
    }
  }
}

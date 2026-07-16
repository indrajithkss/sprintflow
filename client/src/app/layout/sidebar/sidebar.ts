import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <!-- Mobile backdrop blur overlay -->
    <div 
      *ngIf="isOpen" 
      (click)="toggleSidebar()" 
      class="fixed inset-0 bg-[#0b0f1940] backdrop-blur-[2px] z-30 lg:hidden transition-opacity"
    ></div>

    <!-- Sidebar container -->
    <aside 
      class="fixed lg:static inset-y-0 left-0 z-40 w-[260px] bg-[#EEF2F7] border-r border-white/30 p-6 flex flex-col justify-between h-screen transition-transform duration-200 transform shadow-soft lg:shadow-none lg:translate-x-0 lg:transform-none"
      [ngClass]="isOpen ? 'translate-x-0' : 'max-lg:-translate-x-full'"
    >
      <!-- Top Section: Logo & Branding -->
      <div>
        <div class="flex items-center gap-3 mb-10 pl-2">
          <div class="w-9 h-9 rounded-xl bg-[#EEF2F7] flex items-center justify-center shadow-soft text-[#4F46E5]">
            <lucide-icon name="sparkles" size="18"></lucide-icon>
          </div>
          <div>
            <h1 class="font-extrabold text-lg text-[#000000] leading-none">SprintFlow AI</h1>
            <span class="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mt-1 block">Project Hub</span>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="space-y-2">
          <button 
            *ngFor="let item of menuItems"
            (click)="selectTab(item.id)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150"
            [ngClass]="currentTab === item.id ? 'neu-button-primary bg-[#4F46E5] text-white shadow-soft' : 'neu-button text-[#64748B] hover:text-[#1F2937]'"
          >
            <lucide-icon [name]="item.icon" size="16"></lucide-icon>
            <span>{{ item.label }}</span>
          </button>
        </nav>
      </div>

      <!-- Bottom Section: Logout -->
      <div>
        <button 
          (click)="onLogout()"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm neu-button sidebar-logout transition-all duration-150"
        >
          <lucide-icon name="log-out" size="16"></lucide-icon>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  `
})
export class Sidebar {
  @Input() currentTab = 'dashboard';
  @Input() isOpen = false;

  @Output() tabChange = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<void>();

  menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'tasks', label: 'Tasks', icon: 'folder-kanban' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  selectTab(tabId: string) {
    this.tabChange.emit(tabId);
    if (this.isOpen) {
      this.toggle.emit(); // Close sidebar on mobile select
    }
  }

  toggleSidebar() {
    this.toggle.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}

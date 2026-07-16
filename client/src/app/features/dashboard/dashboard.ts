import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { TaskService, Task } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Navbar } from '../../layout/navbar/navbar';
import { TaskCard } from '../tasks/task-card/task-card';
import { TaskForm } from '../tasks/task-form/task-form';
import { Settings } from '../settings/settings';
import { ModalComponent } from '../../shared/components/modal/modal';
import { Button } from '../../shared/components/button/button';
import { Loader } from '../../shared/components/loader/loader';
import { EmptyState } from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    Sidebar,
    Navbar,
    TaskCard,
    TaskForm,
    Settings,
    ModalComponent,
    Button,
    Loader,
    EmptyState
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  public readonly taskService = inject(TaskService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.taskService.loadTasks();
  }

  currentUser = this.authService.currentUser;

  // Layout navigation state
  currentTab = signal('dashboard');
  mobileSidebarOpen = signal(false);

  // Filters State
  statusFilter = signal('All');
  priorityFilter = signal('All');
  sorting = signal('Newest');

  // Task form modal State
  showModal = signal(false);
  selectedTask = signal<Task | null>(null);

  // Delete confirmation modal State
  showDeleteConfirmModal = signal(false);
  taskToDeleteId = signal<string | null>(null);

  // Statistics counters
  totalTasks = computed(() => this.taskService.tasks().length);
  completedTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'Completed').length);
  inProgressTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'In Progress').length);
  pendingTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'Todo').length);
  velocityPercentage = computed(() => {
    const total = this.totalTasks();
    if (total === 0) return 0;
    return Math.round((this.completedTasks() / total) * 100);
  });

  // Filtered & Sorted Tasks
  filteredTasks = computed(() => {
    const status = this.statusFilter();
    const priority = this.priorityFilter();
    const sortVal = this.sorting();

    let result = this.taskService.tasks().filter(task => {
      const matchesStatus = status === 'All' || task.status === status;
      const matchesPriority = priority === 'All' || task.priority === priority;

      return matchesStatus && matchesPriority;
    });

    // Apply Sorting
    if (sortVal === 'Title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortVal === 'Priority') {
      const priorityWeights = { 'High': 3, 'Medium': 2, 'Low': 1 };
      result.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);
    } else {
      // Default: Newest (by creation or reverse array order)
      result.reverse();
    }

    return result;
  });

  // Open modal for task creation
  openCreateModal() {
    this.selectedTask.set(null);
    this.showModal.set(true);
  }

  // Open modal for editing
  openEditModal(task: Task) {
    this.selectedTask.set(task);
    this.showModal.set(true);
  }

  // Open delete confirmation modal
  confirmDeleteTask(id: string) {
    this.taskToDeleteId.set(id);
    this.showDeleteConfirmModal.set(true);
  }

  // Delete task after modal validation
  executeDeleteTask() {
    const id = this.taskToDeleteId();
    if (id) {
      this.taskService.deleteTask(id);
    }
    this.showDeleteConfirmModal.set(false);
    this.taskToDeleteId.set(null);
  }

  // Sign out user and route back to credentials page
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
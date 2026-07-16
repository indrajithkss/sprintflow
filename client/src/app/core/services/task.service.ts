import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed';
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:5000/api/tasks';

  private readonly _tasks = signal<Task[]>([]);

  public readonly tasks = computed(() => this._tasks());
  public readonly loading = signal(false);

  // Stats computed signals
  public readonly totalTasks = computed(() => this._tasks().length);
  public readonly completedTasks = computed(() => this._tasks().filter(t => t.status === 'Completed').length);
  public readonly pendingTasks = computed(() => this._tasks().filter(t => t.status !== 'Completed').length);

  public loadTasks(): void {
    this.loading.set(true);
    this.http.get<{ success: boolean; data: any[] }>(this.API_URL).subscribe({
      next: (res) => {
        if (res.success) {
          const mappedTasks: Task[] = res.data.map(t => ({
            id: t._id,
            title: t.title,
            description: t.description || '',
            priority: t.priority as 'Low' | 'Medium' | 'High',
            status: t.status as 'Todo' | 'In Progress' | 'Completed',
            dueDate: t.dueDate || new Date().toISOString().split('T')[0]
          }));
          this._tasks.set(mappedTasks);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load tasks:', err);
        this.loading.set(false);
      }
    });
  }

  public getTasks(): Task[] {
    return this._tasks();
  }

  public addTask(taskData: Omit<Task, 'id'>): void {
    this.loading.set(true);
    this.http.post<{ success: boolean; data: any }>(this.API_URL, taskData).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const newTask: Task = {
            id: res.data._id,
            title: res.data.title,
            description: res.data.description || '',
            priority: res.data.priority,
            status: res.data.status,
            dueDate: res.data.dueDate || new Date().toISOString().split('T')[0]
          };
          this._tasks.set([newTask, ...this._tasks()]);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to add task:', err);
        this.loading.set(false);
      }
    });
  }

  public updateTask(id: string, updatedFields: Partial<Task>): void {
    this.loading.set(true);
    this.http.put<{ success: boolean; data: any }>(`${this.API_URL}/${id}`, updatedFields).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const updated = this._tasks().map(t => {
            if (t.id === id) {
              return {
                ...t,
                title: res.data.title,
                description: res.data.description || '',
                priority: res.data.priority,
                status: res.data.status,
                dueDate: res.data.dueDate || t.dueDate
              };
            }
            return t;
          });
          this._tasks.set(updated);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to update task:', err);
        this.loading.set(false);
      }
    });
  }

  public deleteTask(id: string): void {
    this.loading.set(true);
    this.http.delete<{ success: boolean }>(`${this.API_URL}/${id}`).subscribe({
      next: (res) => {
        if (res.success) {
          const updated = this._tasks().filter(t => t.id !== id);
          this._tasks.set(updated);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to delete task:', err);
        this.loading.set(false);
      }
    });
  }
}

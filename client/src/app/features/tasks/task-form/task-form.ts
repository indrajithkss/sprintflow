import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Task, TaskService } from '../../../core/services/task.service';
import { ModalComponent } from '../../../shared/components/modal/modal';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ModalComponent,
    Button
  ],
  templateUrl: './task-form.html'
})
export class TaskForm implements OnInit {
  private readonly taskService = inject(TaskService);

  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();

  title = '';
  description = '';
  priority: 'Low' | 'Medium' | 'High' = 'Medium';
  status: 'Todo' | 'In Progress' | 'Completed' = 'Todo';
  dueDate = '';

  ngOnInit() {
    if (this.task) {
      this.title = this.task.title;
      this.description = this.task.description;
      this.priority = this.task.priority;
      this.status = this.task.status;
      this.dueDate = this.task.dueDate;
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.dueDate = tomorrow.toISOString().substring(0, 10);
    }
  }

  onCancel() {
    this.close.emit();
  }

  onSave() {
    if (!this.title.trim()) return;

    const taskData = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      status: this.status,
      dueDate: this.dueDate
    };

    if (this.task) {
      this.taskService.updateTask(this.task.id, taskData);
    } else {
      this.taskService.addTask(taskData);
    }
    this.close.emit();
  }
}

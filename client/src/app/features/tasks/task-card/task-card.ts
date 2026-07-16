import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, SquarePen, Trash2 } from 'lucide-angular';
import { Task } from '../../../core/services/task.service';
import { Badge } from '../../../shared/components/badge/badge';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule,
    Badge,
    Button
  ],
  templateUrl: './task-card.html'
})
export class TaskCard {
  @Input() task!: Task;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit(event: Event) {
    event.stopPropagation();
    this.edit.emit();
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit();
  }
}

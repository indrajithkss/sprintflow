import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.html'
})
export class NotFound {
  private readonly router = inject(Router);

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}

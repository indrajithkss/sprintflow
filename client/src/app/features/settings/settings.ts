import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html'
})
export class Settings implements OnInit {
  private readonly authService = inject(AuthService);

  name = '';
  email = '';
  message = '';
  isSuccess = false;

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.name = user.name || '';
      this.email = user.email || '';
    }
  }

  saveSettings() {
    this.message = '';
    
    if (!this.name || this.name.trim() === '') {
      this.message = 'Name is required.';
      this.isSuccess = false;
      return;
    }

    if (!this.email || this.email.trim() === '') {
      this.message = 'Email address is required.';
      this.isSuccess = false;
      return;
    }

    // Save changes reactively across database and dashboard layout
    this.authService.updateUser(this.name.trim(), this.email.trim()).subscribe({
      next: (res) => {
        if (res.success) {
          this.message = 'Settings saved successfully!';
          this.isSuccess = true;
        } else {
          this.message = 'Failed to update settings.';
          this.isSuccess = false;
        }
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: (err) => {
        console.error(err);
        this.message = err.error?.message || 'Failed to update settings in MongoDB.';
        this.isSuccess = false;
      }
    });
  }
}

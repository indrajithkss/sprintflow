import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { InputComponent } from '../../../shared/components/input/input';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  rememberMe = false;
  errorMessage = '';

  onSubmit(event?: Event) {
    if (event) event.preventDefault();
    this.errorMessage = '';

    if (!this.email || this.email.trim() === '') {
      this.errorMessage = 'Email address is required.';
      return;
    }

    if (!this.password || this.password.trim() === '') {
      this.errorMessage = 'Password is required.';
      return;
    }

    this.authService.login(this.email.trim(), this.password.trim()).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Connection to authentication server failed.';
      }
    });
  }

  forgotPassword() {
    alert('Password reset link has been sent to your email.');
  }
}
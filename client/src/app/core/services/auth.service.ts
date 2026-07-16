import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../constants/api';

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly AUTH_KEY = 'sprintflow_auth_state';
  private readonly TOKEN_KEY = 'sprintflow_token';
  private readonly USER_KEY = 'sprintflow_user';
  private readonly API_URL = API_URL + '/auth';
  
  // Signal to hold auth state
  private readonly _isAuthenticated = signal<boolean>(this.checkInitialAuth());
  private readonly _currentUser = signal<any>(this.loadInitialUser());

  // Public computed values
  public readonly isAuthenticated = computed(() => this._isAuthenticated());
  public readonly currentUser = computed(() => this._currentUser());

  private checkInitialAuth(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.AUTH_KEY) === 'true';
    }
    return false;
  }

  private loadInitialUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { email, password }).pipe(
      tap(response => {
        if (response.success && response.token) {
          this._isAuthenticated.set(true);
          this._currentUser.set(response.user);
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(this.AUTH_KEY, 'true');
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          }
        }
      })
    );
  }

  public logout(): void {
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.AUTH_KEY);
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  public getCurrentUser(): any {
    return this._currentUser();
  }

  public updateUser(name: string, email: string): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/profile`, { name, email }).pipe(
      tap(response => {
        if (response.success && response.user) {
          this._currentUser.set(response.user);
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          }
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationRequest, LoginResponse } from '../models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = 'http://localhost:8080/auth';
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
  private userSubject = new BehaviorSubject<any>(this.getStoredUser());
  private roleSubject = new BehaviorSubject<string | null>(this.getStoredRole());

  public token$ = this.tokenSubject.asObservable();
  public user$ = this.userSubject.asObservable();
  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: AuthenticationRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          if (response.user) {
            this.setUser(response.user);
            if (response.user.role) {
              this.setRole(response.user.role);
            }
          }
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.tokenSubject.next(token);
  }

  setUser(user: any): void {
    localStorage.setItem('auth_user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  setRole(role: string): void {
    localStorage.setItem('auth_role', role);
    this.roleSubject.next(role);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getUser(): any {
    return this.userSubject.value;
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private getStoredUser(): any {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  }

  private getStoredRole(): string | null {
    return localStorage.getItem('auth_role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'ADMIN' || role === 'ROLE_ADMIN';
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_role');
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    this.roleSubject.next(null);
  }
}

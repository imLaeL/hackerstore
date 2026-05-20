import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loading = false;
  error = '';

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    const credentials = {
      login: this.loginForm.get('login')?.value || '',
      password: this.loginForm.get('password')?.value || ''
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        console.log('Login bem-sucedido!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        this.error = err.error?.message || 'Falha na autenticação. Verifique suas credenciais.';
        this.loading = false;
      }
    });
  }
}

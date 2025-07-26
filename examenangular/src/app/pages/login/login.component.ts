import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  generalError: string | null = null;
  showPassword = false;
  formSubmitted = false;
  showToast = false;
  toastTime = '';
  private toastTimer: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      usuario: [
        { value: '', disabled: false },
        [Validators.required, Validators.minLength(3)]
      ],
      password: [
        { value: '', disabled: false },
        [Validators.required, Validators.minLength(3)]
      ]
    });
  }

  ngOnInit(): void {
    this.generalError = null;
    this.formSubmitted = false;
    this.loginForm.reset();
    setTimeout(() => {
      const usuarioInput = document.getElementById('usuario');
      if (usuarioInput) {
        (usuarioInput as HTMLInputElement).focus();
      }
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  get usuario(): AbstractControl | null {
    return this.loginForm.get('usuario');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  showToastMessage(): void {
    this.showToast = true;

    // Auto cerrar después de 3 segundos
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast(): void {
    this.showToast = false;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  async handleLogin(): Promise<void> {
    this.formSubmitted = true;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.generalError = null;

    try {
      const { usuario, password } = this.loginForm.value;

      const loginValido = await this.authService.login(usuario, password);

      if (!loginValido) {
        this.showToastMessage();
        return;
      }

      // Guardar sesión en localStorage
      localStorage.setItem('usuario', usuario);
      localStorage.setItem('sesionActiva', 'true');

      // Redirigir a inicio
      await this.router.navigate(['/inicio']);
    } catch (error) {
      this.generalError = 'Error de autenticación. Intenta de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }
}

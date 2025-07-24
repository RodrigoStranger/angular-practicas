
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  generalError: string | null = null;
  showPassword = false;

  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [
        { value: '', disabled: false },
        [Validators.required, Validators.email]
      ],
      password: [
        { value: '', disabled: false },
        [Validators.required, Validators.minLength(3)]
      ]
    });
  }

  ngOnInit(): void {
    // Opcional: lógica de inicialización
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  handleLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log({ ...this.loginForm.value, result: false });
      return;
    }
    console.log({ ...this.loginForm.value, result: true });
  }
}

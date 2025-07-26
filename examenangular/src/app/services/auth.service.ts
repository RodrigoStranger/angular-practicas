import { Injectable } from '@angular/core';

export interface Credencial {
  usuario: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private credenciales: Credencial[] = [];

  async cargarCredenciales(): Promise<void> {
    try {
      const response = await fetch('/assets/data/credenciales.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.credenciales = await response.json();
    } catch (error) {
      console.error('Error cargando credenciales:', error);
      this.credenciales = [];
    }
  }

  async login(usuario: string, password: string): Promise<boolean> {
    if (!usuario || !password) return false;
    if (this.credenciales.length === 0) {
      await this.cargarCredenciales();
    }
    return this.credenciales.some(
      cred => cred.usuario === usuario && cred.password === password
    );
  }

  getCredenciales(): Credencial[] {
    return this.credenciales;
  }
}

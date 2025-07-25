import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentsService, Estudiante } from '../../service/students.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  onHabilitadoChange(valor: number) {
    if (this.estudianteEditando) {
      this.estudianteEditando.habilitado = valor;
      console.log('Valor seleccionado en el select de habilitado:', valor);
    }
  }
  estudiantes: Estudiante[] = [];
  errorMsg: string | null = null;
  successMsg: string | null = null;

  editando: boolean = false;
  estudianteEditando: Estudiante | null = null;

  constructor(private studentsService: StudentsService) {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.studentsService.getEstudiantes().subscribe({
      next: (data) => {
        // Normalizar habilitado a 1/0
        this.estudiantes = data.map(est => ({
          ...est,
          habilitado: typeof est.habilitado === 'boolean' ? (est.habilitado ? 1 : 0) : Number(est.habilitado)
        }));
      },
      error: () => this.estudiantes = []
    });
  }

  onEditar(est: Estudiante, form: NgForm) {
    this.editando = true;
    this.estudianteEditando = { ...est, habilitado: Number(est.habilitado) };
    if (form.controls['nombre']) form.controls['nombre'].setValue(est.nombre);
    if (form.controls['apellido']) form.controls['apellido'].setValue(est.apellido);
    if (form.controls['correo']) form.controls['correo'].setValue(est.correo);
    if (form.controls['carrera']) form.controls['carrera'].setValue(est.carrera);
    if (form.controls['habilitado']) form.controls['habilitado'].setValue(Number(est.habilitado));
  }

  onSubmit(form: NgForm) {
    this.errorMsg = null;
    if (form.valid) {
      const estudiante: Estudiante = form.value;
      if (this.editando && this.estudianteEditando) {
        // Asegurarse de enviar el id correcto y habilitado como número
        const estudianteConId = { ...estudiante, id: this.estudianteEditando.id, habilitado: Number(estudiante.habilitado) };
        // PUT general
        this.studentsService.actualizarEstudiante(estudianteConId).subscribe({
          next: () => {
            // PUT solo para el estado si cambió
            if (Number(estudiante.habilitado) !== Number(this.estudianteEditando?.habilitado)) {
              this.studentsService.actualizarEstadoEstudiante(estudianteConId.id, estudianteConId.habilitado).subscribe({
                next: () => this.finalizarEdicion(form),
                error: (err) => this.manejarErrorEdicion(err)
              });
            } else {
              this.finalizarEdicion(form);
            }
          },
          error: (err) => this.manejarErrorEdicion(err)
        });
      } else {
        this.studentsService.agregarEstudiante(estudiante).subscribe({
          next: () => {
            this.errorMsg = null;
            this.successMsg = 'Estudiante agregado correctamente';
            form.resetForm();
            this.cargarEstudiantes();
            setTimeout(() => {
              this.successMsg = null;
            }, 3000);
          },
          error: (err) => {
            let msg = 'Error al agregar estudiante';
            if (err?.error?.message) {
              msg = err.error.message;
            } else if (typeof err?.error === 'string') {
              msg = err.error;
            } else if (err?.message) {
              msg = err.message;
            } else {
              msg = JSON.stringify(err);
            }
            this.successMsg = null;
            this.errorMsg = msg;
            setTimeout(() => {
              this.errorMsg = null;
            }, 3000);
          }
        });
      }
    } else {
      Object.values(form.controls).forEach(control => (control as any).markAsTouched());
    }
  }

  finalizarEdicion(form: NgForm) {
    this.errorMsg = null;
    this.successMsg = 'Estudiante actualizado correctamente';
    form.resetForm();
    this.editando = false;
    this.estudianteEditando = null;
    setTimeout(() => {
      this.cargarEstudiantes();
      this.successMsg = null;
    }, 300);
  }

  manejarErrorEdicion(err: any) {
    let msg = 'Error al actualizar estudiante';
    if (err?.error?.message) {
      msg = err.error.message;
    } else if (typeof err?.error === 'string') {
      msg = err.error;
    } else if (err?.message) {
      msg = err.message;
    } else {
      msg = JSON.stringify(err);
    }
    this.successMsg = null;
    this.errorMsg = msg;
    setTimeout(() => {
      this.errorMsg = null;
    }, 3000);
  }
}

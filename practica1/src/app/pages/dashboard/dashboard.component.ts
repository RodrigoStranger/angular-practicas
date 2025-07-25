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
  estudiantes: Estudiante[] = [];
  errorMsg: string | null = null;
  successMsg: string | null = null;

  constructor(private studentsService: StudentsService) {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.studentsService.getEstudiantes().subscribe({
      next: (data) => this.estudiantes = data,
      error: () => this.estudiantes = []
    });
  }

  onSubmit(form: NgForm) {
    this.errorMsg = null;
    if (form.valid) {
      const estudiante: Estudiante = form.value;
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
  }
}

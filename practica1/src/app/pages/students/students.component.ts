import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService, Estudiante } from '../../service/students.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent {
  formEstudiante: FormGroup;
  estudiantes: Estudiante[] = [];
  errorMsg: string | null = null;
  successMsg: string | null = null;

  constructor(private studentsService: StudentsService, private fb: FormBuilder) {
    this.formEstudiante = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      carrera: ['', Validators.required]
    });
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.studentsService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (err) => {
        // Opcional: mostrar error de carga
      }
    });
  }

  guardarEstudiante() {
    this.errorMsg = null;
    if (this.formEstudiante.valid) {
      this.studentsService.agregarEstudiante(this.formEstudiante.getRawValue()).subscribe({
        next: (res) => {
          this.errorMsg = null;
          this.successMsg = 'Estudiante agregado correctamente';
          this.formEstudiante.reset();
          this.cargarEstudiantes();
          setTimeout(() => {
            this.successMsg = null;
          }, 3000);
        },
        error: (err) => {
          let msg;
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
    } else {
      this.formEstudiante.markAllAsTouched();
    }
  }
}

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
    if (form.valid) {
      const estudiante: Estudiante = form.value;
      this.studentsService.agregarEstudiante(estudiante).subscribe({
        next: () => {
          form.resetForm();
          this.cargarEstudiantes();
        },
        error: () => {
          alert('Error al agregar estudiante');
        }
      });
    }
  }
}

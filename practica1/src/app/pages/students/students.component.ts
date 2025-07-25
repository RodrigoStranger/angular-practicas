import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { StudentsService, Estudiante } from '../../service/students.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  constructor(private studentsService: StudentsService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const estudiante: Estudiante = form.value;
      this.studentsService.agregarEstudiante(estudiante).subscribe({
        next: (res) => {
          alert('Estudiante agregado correctamente');
          form.resetForm();
        },
        error: (err) => {
          alert('Error al agregar estudiante');
        }
      });
    }
  }
}

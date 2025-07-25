import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginServiceService } from '../../service/login-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formEstudiante: FormGroup;
  actualizarEstudiante: FormGroup;

  formAulas: FormGroup;

  estudiantes:any;
  estudiante:any;
  aulas:any;
  aula:any;
  messageError:any;
  idAlumno:any;

  constructor(private readonly fb: FormBuilder, private readonly _service: LoginServiceService) {
    this.form = fb.group({
        usuario: ['', Validators.required],
        contrasenia: ['', Validators.required]
    });

    this.formEstudiante = fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', Validators.required],
        carrera: ['', Validators.required],
        habilitado: ['', Validators.required]
    });

    this.actualizarEstudiante = fb.group({
        id: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', Validators.required],
        carrera: ['', Validators.required],
        habilitado: ['', Validators.required]
    });

    this.formAulas = fb.group({
        nombre: ['', Validators.required],
        codigo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("=>", this.form.getRawValue())
    this.listarEstudiantes();
    this.listarAulas();
  }

  guardarEstudiantes(){
    console.log("=>", this.formEstudiante.getRawValue())
    this._service.guardarAlumnos(this.formEstudiante.getRawValue()).subscribe({
      next: (r) => {
        this.listarEstudiantes();
        this.formEstudiante.reset();
      },
      error:(e) =>{

      }
    })
  }

  listarEstudiantes(){
    this._service.obtenerAlumnos().subscribe({
      next: (r) => {
        this.estudiantes = r;
      },
      error:(e) =>{
      }
    })
  }

  obtenerEstudiantes(id:string){
    this._service.obtenerAlumnosPorId(id).subscribe({
      next: (r) => {
        this.actualizarEstudiante.setValue(r)
      },
      error:(e) =>{

      }
    })
  }

  actualizarEstudiantes(){
    this._service.actualizarAlumnos(this.actualizarEstudiante.getRawValue()).subscribe({
      next: (r) => {
        this.listarEstudiantes();
      },
      error:(e) =>{

      }
    })
  }

  eliminarEstudiante(id:string){
    this._service.eliminarAlumnoPorId(id).subscribe({
      next: (r) => {
        console.log(r)
        this.listarEstudiantes();
      },
      error:(e) =>{
        this.messageError = e.error.message;
      }
    })
  }

  actualizarEstado(id:string, habilitado:any){
    let estado = habilitado == 1 ? false : true;
    this._service.cambiarEstado(id, estado).subscribe({
      next: (r) => {
        this.listarEstudiantes();
      },
      error:(e) =>{
      }
    })
  }

  /**AULAS**/

  listarAulas(){
    this._service.obtenerAulas().subscribe({
      next: (r) => {
        this.aulas = r;
      },
      error:(e) =>{
      }
    })
  }

  crearAulas(){
    this._service.guardarAulas(this.formAulas.getRawValue()).subscribe({
      next: (r) => {
        this.listarAulas();
        this.formAulas.reset();
      },
      error:(e) =>{
      }
    })
  }

  /***Inscripciones***/

  mostrarAulas(id:string){
    this.idAlumno = id;
  }

  inscribir(idAula:string){
    this._service.inscripcionAulas(this.idAlumno, idAula).subscribe({
      next: (r) => {
        this.listarAulas();
        this.formAulas.reset();
      },
      error:(e) =>{
      }
    })
  }

}

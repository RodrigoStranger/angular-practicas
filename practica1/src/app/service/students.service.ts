import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  carrera: string;
  habilitado: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:8080/api/estudiantes';

  constructor(private http: HttpClient) {}


  agregarEstudiante(estudiante: Estudiante): Observable<any> {
    return this.http.post(this.apiUrl, estudiante);
  }

  actualizarEstudiante(estudiante: Estudiante): Observable<any> {
    const { id, ...body } = estudiante;
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  actualizarEstadoEstudiante(id: number, habilitado: number): Observable<any> {
    // estado='true'|'false', habilitado='true'|'false' como string
    let estadoStr = 'false';
    let habilitadoStr = 'false';
    if (habilitado === 1) {
      estadoStr = 'true';
      habilitadoStr = 'true';
    } else {
      estadoStr = 'false';
      habilitadoStr = 'false';
    }
    return this.http.put(`${this.apiUrl}/${id}/estado?estado=${estadoStr}&habilitado=${habilitadoStr}`, {});
  }
}

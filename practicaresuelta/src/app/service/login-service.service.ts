import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private readonly http:HttpClient) { }
  
  api = 'http://localhost:8080/api/estudiantes'
  api2 = 'http://localhost:8080/api/estudiantes/aulas'

  guardarAlumnos(body:any):Observable<any>{
    return this.http.post(this.api, body);
  }

  /*obtenerAlumnos():Observable<any>{
    return this.http.get(this.api)
  }*/

  obtenerAlumnos():Observable<any>{
    return this.http.get(this.api + '/all');
  }

  obtenerAlumnosPorId(id:string):Observable<any>{
    return this.http.get(this.api + '/' + id);
  }

  actualizarAlumnos(body:any):Observable<any>{
    return this.http.put(this.api + '/' + body.id, body);
  }

  eliminarAlumnoPorId(id:string):Observable<any>{
    return this.http.delete(this.api + '/' + id);
  }

  cambiarEstado(id:string, estado:boolean){
    let parametros = new HttpParams;
    parametros = parametros.set('habilitado', estado);

    return this.http.put(this.api + '/' + id + '/estado', parametros);
  }

  guardarAulas(body:any):Observable<any>{
    return this.http.post(this.api2, body);
  }

  obtenerAulas():Observable<any>{
    return this.http.get(this.api2);
  }

  inscripcionAulas(idAlumno:string, idAula:string):Observable<any>{
    let options = new HttpHeaders;
    return this.http.post(this.api2 + '/' + idAula + '/estudiantes/' + idAlumno, options);
  }

}

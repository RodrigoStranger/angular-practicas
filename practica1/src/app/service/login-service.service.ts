import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private readonly http:HttpClient) { }
  
  api = 'http:localhost:8080/api'

  sendLogin():Observable<any>{
    let param = new HttpParams;
    let header = new HttpHeaders;
    let options = {
      params: param,
      headers: header
    }

    return this.http.post('url', 'body')
  }

  getLogin():Observable<any>{
    return this.http.get('url')
  }

  deleteLogin():Observable<any>{
    return this.http.delete('url')
  }

  updateLogin():Observable<any>{
    return this.http.put('url', 'body')
  }

}

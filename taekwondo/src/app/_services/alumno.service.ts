import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../_models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  API_URI = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAlumnos(){
    return this.http.get(this.API_URI+'/alumno');
  }

  getAlumno(id: number){
    return this.http.get(this.API_URI+'/alumno/'+id);
  }

  createAlumno(alumno: Alumno){
    return this.http.post(this.API_URI+'/alumno', alumno);
  }

  updateAlumno(alumno: Alumno){
    return this.http.put(this.API_URI+'/alumno/'+alumno.id, alumno);
  }

  deleteAlumno(id: number){
    return this.http.delete(this.API_URI+'/alumno/'+id);
  }
}

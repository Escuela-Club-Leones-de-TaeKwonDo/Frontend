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

  getAlumno(id_alumno: number){
    return this.http.get(this.API_URI+'/alumno/'+id_alumno);
  }

  createAlumno(alumno: Alumno){
    console.log(alumno)
    return this.http.post(this.API_URI+'/alumno', alumno);
  }

  updateAlumno(alumno: Alumno){
    return this.http.put(this.API_URI+'/alumno/'+alumno.id_alumno, alumno);
  }

  deleteAlumno(id_alumno: number){
    return this.http.delete(this.API_URI+'/alumno/'+id_alumno);
  }
}

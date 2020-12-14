import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Examen } from '../_models/examen';
import { ExamenLista } from '../_models/examenLista';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  API_URI = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getExamenes(){
    return this.http.get(this.API_URI+'/examen');
  }

  getExamen(id: number){
    return this.http.get<Examen>(this.API_URI+'/examen/'+id);
  }

  createExamen(examen: Examen){
    return this.http.post(this.API_URI+'/examen', examen);
  }

  updateExamen(examen: Examen){
    return this.http.put(this.API_URI+'/examen/'+examen.id,examen);
  }

  deleteExamen(id: number){
    return this.http.delete(this.API_URI+'/examen/'+id);
  }

  createEx_al(examenLista: ExamenLista){
    return this.http.post(this.API_URI+"/examenA/",examenLista);
  }
}

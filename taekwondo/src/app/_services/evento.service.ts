import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../_models/evento';


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  API_URI = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getEventos(){
    return this.http.get(this.API_URI+'/evento');
  }

  getEvento(id_evento: number){
    return this.http.get(this.API_URI+'/evento/'+id_evento);
  }

  //Este aún no lo tenemos implementado en la API
  getEventosAlumno(id_alumno: number){
    return this.http.get<Evento[]>(this.API_URI+'/evento/alumno'+id_alumno);
  }

  createEvento(evento: Evento){
    console.log(evento);
    return this.http.post(this.API_URI+'/evento',evento);
  }

  updateEvento(evento: Evento){
    return this.http.put(this.API_URI+'/evento/'+evento.id_evento,evento);
  }

  deleteEvento(id_evento: number){
    return this.http.delete(this.API_URI+'/evento/'+id_evento);
  }





}

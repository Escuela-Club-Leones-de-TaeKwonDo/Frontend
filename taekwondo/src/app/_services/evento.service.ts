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
    return this.http.get<Evento[]>(this.API_URI+'/evento');
  }

  getEvento(id: number){
    return this.http.get<Evento>(this.API_URI+'/evento/'+id);
  }

  getEventosTipoEvento(id_tipo_evento: number){
    return this.http.get<Evento[]>(this.API_URI+'/evento/tipo_evento/'+id_tipo_evento);
  }

  createEvento(evento: Evento, id_tipo_evento: number){
    return this.http.post(this.API_URI+'/evento/'+id_tipo_evento,evento);
  }

  updateEvento(evento: Evento, id: number, id_tipo_evento: number){
    return this.http.put(this.API_URI+'/evento/'+id+'/'+id_tipo_evento,evento);
  }

  deleteEvento(id: number){
    return this.http.delete(this.API_URI+'/evento/'+id);
  }
}

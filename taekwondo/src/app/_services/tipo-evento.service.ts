import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoEvento } from '../_models/tipo-evento';


@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {

  API_URI = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getTipoEventos(){
    return this.http.get(this.API_URI+'/tipo_evento');
  }

  getTipoEvento(id: number){
    return this.http.get(this.API_URI+'/tipo_evento/'+id);
  }

  createTipoEvento(tipo_evento: TipoEvento){
    console.log(tipo_evento);
    return this.http.post(this.API_URI+'/tipo_evento',tipo_evento);
  }

  updateTipoEvento(tipo_evento: TipoEvento){
    console.log(tipo_evento)
    return this.http.put(this.API_URI+'/tipo_evento/'+tipo_evento.id, tipo_evento);
  }

  deleteTipoEvento(id: number){
    return this.http.delete(this.API_URI+'/tipo_evento/'+id);
  }
}
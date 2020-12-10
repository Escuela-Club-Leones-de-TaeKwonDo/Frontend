import { Component, OnInit } from '@angular/core';
import { TipoEvento } from 'src/app/_models/tipo-evento';
import { TipoEventoService } from 'src/app/_services/tipo-evento.service';

import { Evento } from 'src/app/_models/evento';
import { EventoService } from 'src/app/_services/evento.service'

@Component({
  selector: 'app-evento-alumno',
  templateUrl: './evento-alumno.component.html',
  styleUrls: ['./evento-alumno.component.css']
})
export class EventoAlumnoComponent implements OnInit {
  eventos: Evento[];
  submitted = false;
  modalTitle: String;

  tipoEventos: TipoEvento[] | any;
  tipoEventoSeleccionado: number;
  principal: Evento;

  constructor(private tipoEventoService: TipoEventoService, private eventoService: EventoService) { }

  ngOnInit(): void {
    //Consulte la lista de eventos
    this.getTipoEventos()
  }

  getTipoEventos() {
    this.tipoEventos = [];
    this.tipoEventoService.getTipoEventos().subscribe(
      res => {
        this.tipoEventos = res;
        const random = Math.floor(Math.random() * this.tipoEventos.length);
        const event = this.tipoEventos[random];
        this.tipoEventoSeleccionado = event.id
        console.log(this.tipoEventoSeleccionado)
        this.eventos = [];
        this.eventoService.getEventosTipoEvento(this.tipoEventoSeleccionado).subscribe(
          res => {
            this.eventos = res;
            this.principal = this.eventos.pop();
          },
          err => console.error(err)
        )
      },
      err => console.error(err)
    )
  }

  getEventoTipoEvento(id) {
    console.log(id);
    this.eventos = [];
    this.eventoService.getEventosTipoEvento(id).subscribe(
      res => {
        this.eventos = res;
        console.log("((((((((((", this.eventos)
      },
      err => console.error(err)
    )
  }
}

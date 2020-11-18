/*
* Clase que sirve para la manipulación de datos del componente evento
*/
import { Component, OnInit } from '@angular/core';
//Para el formulario de registro de evento
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Evento } from 'src/app/_models/evento';
import { EventoService } from 'src/app/_services/evento.service'

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  eventos: Evento[] | any;
  evento: Evento | any;
  eventoForm: FormGroup;
  submitted = false; //clic cuando le demos registrar evento y hacer algunas validaciones 

  constructor(private eventoService: EventoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //inicia el formulario vacio 
    this.eventoForm = this.formBuilder.group({
      id_evento: [''],
      nombre: ['', Validators.required],
      id_tipo_evento: ['', Validators.required],
      descripcio: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      costo: ['', Validators.required],
      enlace_facebook: ['']

    });
    //Consulte la lista de eventos
    this.getEventos();
  }

  // Consultar lista de eventos
  getEventos(){
    this.eventos = [];
    this.eventoService.getEventos().subscribe(
      res => {
        this.eventos = res;
        console.log(this.eventos)
      },
      err => console.error(err)
    )

    //this.eventos = [new Evento("EDC",1 ,"electronica","1970-08-25T00:00:00.000+00:00","1970-08-25T00:00:00.000+00:00", 50, "http:tony")]; 
    

  }

  // Consultar un evento
  getEvento(id){
    this.evento = null;
    this.eventoService.getEvento(id).subscribe(
      res => {
        this.evento = res;
      },
      err => console.error(err)
    )
  }

  // Eliminar un Evento
  deleteEvento(id){
    this.eventoService.deleteEvento(id).subscribe(
      res => {
        this.getEventos();
      },
      err => console.error(err)
    )
  }

  // Crear un evento
  onSubmit(){
    this.submitted = true;

    if(this.eventoForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    this.eventoService.createEvento(this.eventoForm.value).subscribe(
      res => {
        Swal.fire({       //confirmacion de la accion de crear evento se a registrado correctamente
          position: 'top-end',
          icon: 'success',
          title: 'El evento ha sido creado',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEventos();
        this.submitted = false;
      },
      err => console.error(err)
    )
  }

  // Actualizar un evento
  updateEvento(evento: Evento){
    this.submitted = true;

    this.eventoForm.controls['id_evento'].setValue(evento.id_evento);
    this.eventoForm.controls['nombre'].setValue(evento.nombre);
    this.eventoForm.controls['id_tipo_evento'].setValue(evento.id_tipo_evento);
    this.eventoForm.controls['descripcion'].setValue(evento.descripcion);
    this.eventoForm.controls['fecha_inicio'].setValue(evento.fecha_inicio);
    this.eventoForm.controls['fecha_fin'].setValue(evento.fecha_fin);
    this.eventoForm.controls['costo'].setValue(evento.costo);
    this.eventoForm.controls['enlace_facebook'].setValue(evento.enlace_facebook);
    
  }

  get f() { return this.eventoForm.controls; }

  openModalEvento(){
    this.eventoForm.reset();
    $("#eventoModal").modal("show");
  }
}

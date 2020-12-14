import { Component, OnInit } from '@angular/core';

import { TipoEvento } from 'src/app/_models/tipo-evento';
import { TipoEventoService } from 'src/app/_services/tipo-evento.service';

import { Evento } from 'src/app/_models/evento';
import { EventoService } from 'src/app/_services/evento.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Event, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Alumno } from 'src/app/_models/alumno';
import { AlumnoService } from 'src/app/_services/alumno.service';
import { EventoLista } from 'src/app/_models/eventoLista';

declare var $: any;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})

export class EventoComponent implements OnInit {

  evento: Evento | any;
  eventos: Evento[];
  eventoForm: FormGroup;
  submitted = false; 
  modalTitle: String;

  alumnos: Alumno[] | any;
  alumnosEvento: Alumno[] | any;
  alumnoSeleccionado: number;

  tipoEventos: TipoEvento[] | any;
  tipoEventoSeleccionado: number;

  constructor(private tipoEventoService: TipoEventoService,
    private eventoService: EventoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    //inicia el formulario vacio 
    this.eventoForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_tipo_evento: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      costo: ['', Validators.required],
      enlace_facebook: [''],
    });
    //Consulte la lista de eventos
    this.getTipoEventos();
    this.tipoEventoSeleccionado = 0;
    this.alumnoSeleccionado = 0;
    this.getAlumnos();
  }

  getTipoEventos(){
    this.tipoEventos = [];
    this.tipoEventoService.getTipoEventos().subscribe(
      res => {
        this.tipoEventos = res;
      },
      err => console.error(err)
    )
  }

  getAlumnos(){
    this.alumnos = [];
    this.alumnoService.getAlumnos().subscribe(
      res => {
        this.alumnos = res;
      },
      err => console.error(err)
    )
  }

  getEventoTipoEvento(id: number){
    this.eventos = [];
    this.eventoService.getEventosTipoEvento(id).subscribe(
      res => {
        this.eventos = res;
      },
      err => console.error(err)
    )
  }

  getAlumnosEvento(id){
    this.alumnosEvento = [];
    this.eventoService.getAlumnos(id).subscribe(
      res => {
        this.alumnosEvento = res;
      },
      err => console.error(err)
    )
  }

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
  deleteEvento(id: number, id_tipo_evento: number){
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Una vez eliminado el Evento no podrá ser recuperado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        this.eventoService.deleteEvento(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'El evento ha sido eliminado',
              'success'
            )
            this.getEventoTipoEvento(id_tipo_evento);
          },
          err => console.error(err)
        )
      }
    })
  }

  createEv_al(){
    console.log(this.idEvento);
    console.log(this.alumnoSeleccionado);
    this.eventoService.createEv_al(new EventoLista(this.idEvento,this.alumnoSeleccionado)).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'se ha registrado el alumno',
          showConfirmButton: false,
          timer: 1500
        })
        $("#asignaModal").modal("hide");
        this.getAlumnosEvento(this.idEvento);
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

    if(this.modalTitle == "Registrar"){
      this.eventoService.createEvento(this.eventoForm.value, this.tipoEventoSeleccionado).subscribe(
        res => {
          Swal.fire({       //confirmacion de la accion de crear evento se a registrado correctamente
            position: 'top-end',
            icon: 'success',
            title: 'El evento ha sido creado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#eventoModal").modal("hide");
          this.getEventoTipoEvento(this.tipoEventoSeleccionado);
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      this.eventoService.updateEvento(this.eventoForm.value, this.idActualizar, this.tipoEventoSeleccionado).subscribe(
        res => {
          Swal.fire({       //confirmacion de la accion de crear evento se a registrado correctamente
            position: 'top-end',
            icon: 'success',
            title: 'El evento ha sido actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#eventoModal").modal("hide");
          this.getEventoTipoEvento(this.tipoEventoSeleccionado);
          this.submitted = false;
        },
        err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al conectar con el servidor'
          })
        }
      )
    }
  }

  idActualizar: number;
  // Actualizar un evento
  updateEvento(evento: Evento){
    this.submitted = true;

    this.idActualizar = evento.id;

    this.eventoForm.controls['id'].setValue(evento.id);
    this.eventoForm.controls['nombre'].setValue(evento.nombre);
    this.eventoForm.controls['descripcion'].setValue(evento.descripcion);
    this.eventoForm.controls['id_tipo_evento'].setValue(evento.id_tipo_evento);
    this.eventoForm.controls['fecha_inicio'].setValue(evento.fecha_inicio);
    this.eventoForm.controls['fecha_fin'].setValue(evento.fecha_fin);
    this.eventoForm.controls['costo'].setValue(evento.costo);
    this.eventoForm.controls['enlace_facebook'].setValue(evento.enlace_facebook);
    
    this.modalTitle = "Actualizar";
    $("#eventoModal").modal("show");
  }

  idEvento: number;
  asignarAlumno(evento: Evento){
    this.modalTitle = "Asignar alumno a " + evento.nombre;
    this.idEvento = evento.id;
    this.getAlumnosEvento(this.idEvento);
    $("#asignarModal").modal("show");
  }

  get f() { return this.eventoForm.controls; }

  abreTipoEvento(){
    this.router.navigate(['/tipo-evento']);
  }

  openModalEvento(){
    this.eventoForm.reset();
    this.modalTitle = "Registrar"
    $("#eventoModal").modal("show");
  }
}

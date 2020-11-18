import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TipoEvento } from 'src/app/_models/tipo-evento';
import { TipoEventoService } from 'src/app/_services/tipo-evento.service';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.css']
})

export class TipoEventoComponent implements OnInit {
    tipoeventos: TipoEvento[] | any;
  tipoevento: TipoEvento | any;
  tipoeventoForm: FormGroup;
  submitted = false;

  constructor(private tipoeventoService: TipoEventoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //inicia el formulario vacio 
    this.tipoeventoForm = this.formBuilder.group({
      id_tipo_evento: [''],
      nombre_tipo_evento: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    //Consulte la lista de eventos
    this.getTipoEventos();
  }

  // Consultar lista de eventos
  getTipoEventos(){
    this.tipoeventos = [];
    this.tipoeventoService.getTipoEventos().subscribe(
      res => {
        this.tipoeventos = res;
        console.log(this.tipoeventos)
      },
      err => console.error(err)
    )

    //this.eventos = [new Evento("EDC",1 ,"electronica","1970-08-25T00:00:00.000+00:00","1970-08-25T00:00:00.000+00:00", 50, "http:tony")]; 
    

  }

  // Consultar un evento
  getTipoEvento(id){
    this.tipoeventos = null;
    this.tipoeventoService.getTipoEvento(id).subscribe(
      res => {
        this.tipoevento = res;
      },
      err => console.error(err)
    )
  }

  // Eliminar un Evento
  deleteTipoEvento(id){
    console.log(id)
    this.tipoeventoService.deleteTipoEvento(id).subscribe(
      res => {
        this.getTipoEventos();
      },
      err => console.error(err)
    )
  }

  // Crear un evento
  onSubmit(){
    this.submitted = true;

    if(this.tipoeventoForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    this.tipoeventoService.createTipoEvento(this.tipoeventoForm.value).subscribe(
      res => {
        Swal.fire({       //confirmacion de la accion de crear evento se a registrado correctamente
          position: 'top-end',
          icon: 'success',
          title: 'El evento ha sido creado',
          showConfirmButton: false,
          timer: 1500
        })
        this.getTipoEventos();
        this.submitted = false;
      },
      err => console.error(err)
    )
  }

  // Actualizar un evento
  updateTipoEvento(tipoevento: TipoEvento){
    this.submitted = true;
    this.tipoeventoForm.controls['id_tipo_evento'].setValue(tipoevento.id_tipo_evento);
    this.tipoeventoForm.controls['nombre_tipo_evento'].setValue(tipoevento.nombre_tipo_evento);
    this.tipoeventoForm.controls['descripcion'].setValue(tipoevento.descripcion);
  }

  get f() { return this.tipoeventoForm.controls; }

  openModalEvento(){
    this.tipoeventoForm.reset();
    $("#tipoeventoModal").modal("show");
  }

}

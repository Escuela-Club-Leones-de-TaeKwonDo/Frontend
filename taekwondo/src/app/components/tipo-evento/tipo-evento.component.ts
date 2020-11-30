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
  modalTitle: String;

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
    this.tipoeventos = [new TipoEvento(1,"Premiación", "Premiación de torneo"), new TipoEvento(2,"Avance de título", "Avance en los títulos")];
    this.tipoeventoService.getTipoEventos().subscribe(
      res => {
        this.tipoeventos = res;
        console.log(this.tipoeventos)
      },
      err => console.error(err)
    )
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

    if(this.modalTitle == "Registrar"){
      this.tipoeventoService.createTipoEvento(this.tipoeventoForm.value).subscribe(
        res => {
          Swal.fire({       //confirmacion de la accion de crear evento se a registrado correctamente
            position: 'top-end',
            icon: 'success',
            title: 'El tipo de evento ha sido creado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#tipoeventoModal").modal("hide");
          this.getTipoEventos();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      this.tipoeventoService.updateTipoEvento(this.tipoeventoForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El tipo de evento ha sido actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#tipoeventoModal").modal("hide");
          this.getTipoEventos();
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

  // Actualizar un evento
  updateTipoEvento(tipoevento: TipoEvento){
    this.submitted = true;

    this.tipoeventoForm.controls['id_tipo_evento'].setValue(tipoevento.id_tipo_evento);
    this.tipoeventoForm.controls['nombre_tipo_evento'].setValue(tipoevento.nombre_tipo_evento);
    this.tipoeventoForm.controls['descripcion'].setValue(tipoevento.descripcion);

    this.modalTitle = "Actualizar";
    $("#tipoeventoModal").modal("show");
  }

  get f() { return this.tipoeventoForm.controls; }

  openModalEvento(){
    this.tipoeventoForm.reset();
    this.modalTitle = "Registrar";
    $("#tipoeventoModal").modal("show");
  }
}

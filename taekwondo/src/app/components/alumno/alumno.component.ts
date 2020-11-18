import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Alumno } from 'src/app/_models/alumno';
import { AlumnoService } from 'src/app/_services/alumno.service';
declare var $: any;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  alumnos: Alumno[] | any;
  alumno: Alumno | any;
  alumnoForm: FormGroup;
  imagen: File;
  submitted = false;
  updated = false;



  constructor(private alumnoService: AlumnoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.alumnoForm = this.formBuilder.group({
      id_alumno: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      fotografia: [''],
      actividad_marcial: ['', Validators.required],
      grado: ['', Validators.required],
      seguro_medico: [''],
      certificado_medico: [''],
      carta_responsiva: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]]
    });
    //Consulte la lista de alumnos
    this.getAlumnos();
  }

    // Crear una persona
    createAlumno(){
      this.submitted = true;
  
      if(this.alumnoForm.invalid){
        console.log('Formulario inválido');
        return;
      }
  
      this.alumnoService.createAlumno(this.alumnoForm.value).subscribe(
        res => {
          this.getAlumnos();
          $("#personaModal").modal("hide");
        },
        err => console.error(err)
      )
    }
  

  // Consultar lista de alumnos
  getAlumnos(){
    this.alumnos = [];
    this.alumnoService.getAlumnos().subscribe(
      res => {
        this.alumnos = res;
        console.log(this.alumnos)
      },
      err => console.error(err)
    )
  }

  // Consultar un alumno
  getAlumno(id){
    this.alumno = null;
    this.alumnoService.getAlumno(id).subscribe(
      res => {
        this.alumno = res;
      },
      err => console.error(err)
    )
  }

  // Eliminar un alumno
  deleteAlumno(id){
    this.alumnoService.deleteAlumno(id).subscribe(
      res => {
        this.getAlumnos();
      },
      err => console.error(err)
    )
  }

  // Crear un alumno
  onSubmit(){
    this.submitted = true;
     console.log(this.alumnoForm)
    if(this.alumnoForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    this.alumnoService.createAlumno(this.alumnoForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El alumno ha sido creado',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAlumnos();
        this.submitted = false;
      },
      err => console.error(err)
    )
  }

  // Actualizar un alumno
  updateAlumno(alumno: Alumno){
    this.submitted = true;

    this.alumnoForm.controls['id_alumno'].setValue(alumno.id_alumno);
    this.alumnoForm.controls['nombre'].setValue(alumno.nombre);
    this.alumnoForm.controls['apellidos'].setValue(alumno.apellidos);
    this.alumnoForm.controls['fecha_nacimiento'].setValue(alumno.fecha_nacimiento);
    this.alumnoForm.controls['fotografia'].setValue(alumno.fotografia);
    this.alumnoForm.controls['actividad_marcial'].setValue(alumno.actividad_marcial);
    this.alumnoForm.controls['grado'].setValue(alumno.grado);
    this.alumnoForm.controls['seguro_medico'].setValue(alumno.seguro_medico);
    this.alumnoForm.controls['certificado_medico'].setValue(alumno.certificado_medico);
    this.alumnoForm.controls['carta_responsiva'].setValue(alumno.carta_responsiva);
    this.alumnoForm.controls['password'].setValue(alumno.password);
    this.alumnoForm.controls['email'].setValue(alumno.email);
  }

  imagenSelected(event){
    this.imagen = <File> event.target.files[0];
  }

  convertImage(thiss): any {
    let reader = new FileReader();
    reader.readAsDataURL(thiss.imagen);
    reader.onload = function () {
      thiss.alumnoForm.controls['fotografia'].setValue(reader.result);
    };
    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  get f() { return this.alumnoForm.controls; }

  openModalAlumno(){
    this.alumnoForm.reset();
    $("#alumnoModal").modal("show");
  }

  openUpdateModalAlumno(alumno){
    $("#alumnoModal").modal("show");
  }

}

import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Alumno } from 'src/app/_models/alumno';
import { AlumnoService } from 'src/app/_services/alumno.service';

import Swal from 'sweetalert2';

declare var $: any;

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
  modalTitle: String;

  constructor(private alumnoService: AlumnoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.alumnoForm = this.formBuilder.group({
      id_alumno: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      fotografia: [''],
      actividad: ['', Validators.required],
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

  // Consultar lista de alumnos
  getAlumnos(){
    this.alumnos = [new Alumno(1, "Kevin", "Villegas", "11-10-1997", "Foto", "Tae Kwon Do", "Cinta Negra", "Seguro M", "Certificado M", "Carta R", "Pass", "Mail"),
                    new Alumno(2, "Ricardo", "Salvador", "10-11-1997", "Fotografia", "Kick Boxing", "Cinta Morada", "Seguro", "Certificado", "Carta", "Password", "Email")];
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
    Swal.fire({
      title: 'Eliminar Alumno',
      text: '¿Estás seguro que deseas eliminar al alumno?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'No eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.alumnoService.deleteAlumno(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'El alumno ha sido eliminado',
              'success'
            )
            $("#alumnoModal").modal("hide");
            this.getAlumnos();
          },
          err => console.error(err)
        )
      }
    });
  }

  // Crear un alumno
  onSubmit(){
    this.submitted = true;

    if(this.alumnoForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    if(this.modalTitle == "Registrar"){
      this.alumnoService.createAlumno(this.alumnoForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El alumno ha sido registrado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#alumnoModal").modal("hide");
          this.getAlumnos();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.alumnoForm.value);
      this.alumnoService.updateAlumno(this.alumnoForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El alumno ha sido actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#alumnoModal").modal("hide");
          this.getAlumnos();
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

  // Actualizar un alumno
  updateAlumno(alumno: Alumno){
    this.submitted = true;

    this.alumnoForm.controls['nombre'].setValue(alumno.nombre);
    this.alumnoForm.controls['apellidos'].setValue(alumno.apellidos);
    this.alumnoForm.controls['fecha_nacimiento'].setValue(alumno.fecha_nacimiento);
    this.alumnoForm.controls['fotografia'].setValue(alumno.fotografia);
    this.alumnoForm.controls['actividad'].setValue(alumno.actividad);
    this.alumnoForm.controls['grado'].setValue(alumno.grado);
    this.alumnoForm.controls['seguro_medico'].setValue(alumno.seguro_medico);
    this.alumnoForm.controls['certificado_medico'].setValue(alumno.certificado_medico);
    this.alumnoForm.controls['carta_responsiva'].setValue(alumno.carta_responsiva);
    this.alumnoForm.controls['email'].setValue(alumno.email);

    this.modalTitle = alumno.nombre + " " + alumno.apellidos + " (" + alumno.id_alumno + ")";
    $("#alumnoModal").modal("show");
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
    this.modalTitle = "Registrar";
    $("#alumnoModal").modal("show");
  }
}

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
  fotografia: File;
  submitted = false;
  modalTitle: String;

  constructor(private alumnoService: AlumnoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.alumnoForm = this.formBuilder.group({
      id: [''],
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

  // Consultar lista de alumnos
  getAlumnos(){
    this.alumnos = [];// [new Alumno(1, "Kevin", "Villegas", "11-10-1997", "Foto", "Tae Kwon Do", "Cinta Negra", "Seguro M", "Certificado M", "Carta R", "Pass", "Mail"),
                    //new Alumno(2, "Ricardo", "Salvador", "10-11-1997", "Fotografia", "Kick Boxing", "Cinta Morada", "Seguro", "Certificado", "Carta", "Password", "Email")];
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

  imagenSelected(event){
    this.fotografia = <File> event.target.files[0];
  }

  convertImage(thiss): any {
    let reader = new FileReader();
    reader.readAsDataURL(thiss.fotografia);
    reader.onload = function () {
      thiss.alumnoForm.controls['fotografia'].setValue(reader.result);
      console.log(thiss.alumnoForm.value);

      if(thiss.modalTitle == "Registrar"){
        thiss.alumnoService.createAlumno(thiss.alumnoForm.value).subscribe(
          res => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El alumno ha sido registrado',
              showConfirmButton: false,
              timer: 1500
            })
            $("#alumnoModal").modal("hide");
            thiss.getAlumnos();
            thiss.submitted = false;
          },
          err => console.error(err)
        )
      }else{
        console.log(thiss.alumnoForm.value);
        thiss.alumnoService.updateAlumno(thiss.alumnoForm.value).subscribe(
          res => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El alumno ha sido actualizado',
              showConfirmButton: false,
              timer: 1500
            })
            $("#alumnoModal").modal("hide");
            thiss.getAlumnos();
            thiss.submitted = false;
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
    };
    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  // Crear un alumno
  onSubmit(){
    this.submitted = true;

    if(this.alumnoForm.invalid){
      console.log(this.alumnoForm.value);
      console.log("Formulario inválido");
      return;
    }

    this.convertImage(this);
  }

  // Actualizar un alumno
  updateAlumno(alumno: Alumno){
    this.submitted = true;

    this.alumnoForm.controls['id'].setValue(alumno.id);
    this.alumnoForm.controls['nombre'].setValue(alumno.nombre);
    this.alumnoForm.controls['apellidos'].setValue(alumno.apellidos);
    this.alumnoForm.controls['fecha_nacimiento'].setValue(alumno.fecha_nacimiento);
    this.alumnoForm.controls['fotografia'].setValue(alumno.fotografia);
    this.alumnoForm.controls['actividad_marcial'].setValue(alumno.actividad_marcial);
    this.alumnoForm.controls['grado'].setValue(alumno.grado);
    this.alumnoForm.controls['seguro_medico'].setValue(alumno.seguro_medico);
    this.alumnoForm.controls['certificado_medico'].setValue(alumno.certificado_medico);
    this.alumnoForm.controls['carta_responsiva'].setValue(alumno.carta_responsiva);
    this.alumnoForm.controls['email'].setValue(alumno.email);

    this.modalTitle = "Actualizar";
    $("#alumnoModal").modal("show");
  }

  //Convertir un archivo pdf a base 64
  convertFileSeguro(event){
    var pdftobase64 = function(file,form){
      Swal.fire({
        title: 'Espera un momento!',
        html: 'El archivo PDF se está cargando',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        form.controls['seguro_medico'].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function(error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0], this.alumnoForm);
  }

  showPDFSeguro(pdf_base64){
    const linkSource = pdf_base64;
    const downloadLink = document.createElement("a");
    const fileName = "SeguroMedico.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    return downloadLink;
  }

  convertFileCertificado(event){
    var pdftobase64 = function(file,form){
      Swal.fire({
        title: 'Espera un momento!',
        html: 'El archivo PDF se está cargando',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        form.controls['certificado_medico'].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function(error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0], this.alumnoForm);
  }

  showPDFCertificado(pdf_base64){
    const linkSource = pdf_base64;
    const downloadLink = document.createElement("a");
    const fileName = "CertificadoMedico.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    return downloadLink;
  }

  convertFileCarta(event){
    var pdftobase64 = function(file,form){
      Swal.fire({
        title: 'Espera un momento!',
        html: 'El archivo PDF se está cargando',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        form.controls['carta_responsiva'].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function(error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0], this.alumnoForm);
  }

  showPDFCarta(pdf_base64){
    const linkSource = pdf_base64;
    const downloadLink = document.createElement("a");
    const fileName = "CartaResponsiva.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    return downloadLink;
  }

  // Implementación para la parte del select de actividades
  actividades = [
    'Tae Kwon Do',
    'Kick Boxing',
    'Acondicionamiento Físico',
  ]

  cintas = []

  cintasSeleccion = {
    'Tae Kwon Do': ["10° KUP - Blanco","9° KUP - Naranja", "8° KUP - Amarillo","7° KUP - Amarillo Avanzado",
      "6° KUP - Verde", "5° KUP - Verde Avanzado", "4° KUP - Azul", "3° KUP - Azul Avanzado", "2° KUP - Rojo",
      "1° KUP - Rojinegro", "1° DAN o POOM - Negro"],
    'Kick Boxing': ["Blanca","Amarilla","Naranja","Verde","Azul","Café - Café negra","Negra"],
    'Acondicionamiento Físico': ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4", "Nivel 5"],
  }

  cambioCinta(seleccion){
    this.cintas = this.cintasSeleccion[seleccion];
    this.alumnoForm.controls['actividad_marcial'].setValue(seleccion);
  }

  chequeoGrado(seleccion){
    console.log(seleccion);
    this.alumnoForm.controls['grado'].setValue(seleccion);
  }

  // Implementación para mostrar el perfil
  alumnoFecha: Date;
  alumnoNombre: String;
  alumnoCorreo: String;
  alumnoActividad: String;
  alumnoGrado: String;
  alumnoImagen: String;
  alumnoCarta: String;
  alumnoSeguro: String;
  alumnoCertificado: String;

  openModalPerfil(alumno: Alumno){
    this.modalTitle = "Perfil";
    this.alumnoNombre = alumno.nombre + " " + alumno.apellidos;
    this.alumnoFecha = alumno.fecha_nacimiento;
    this.alumnoCorreo = alumno.email;
    this.alumnoActividad = alumno.actividad_marcial;
    this.alumnoGrado = alumno.grado;
    this.alumnoImagen = alumno.fotografia;
    this.alumnoCarta = alumno.carta_responsiva;
    this.alumnoSeguro = alumno.seguro_medico;
    this.alumnoCertificado = alumno.certificado_medico;
    $("#alumnoPerfil").modal("show");
  }

  get f() { return this.alumnoForm.controls; }

  openModalAlumno(){
    this.alumnoForm.reset();
    this.modalTitle = "Registrar";
    $("#alumnoModal").modal("show");
  }
}

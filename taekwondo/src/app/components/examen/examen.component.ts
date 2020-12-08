import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Examen } from 'src/app/_models/examen';
import { ExamenService } from 'src/app/_services/examen.service';
import { LoginService } from 'src/app/_services/login.service';
import Swal from 'sweetalert2';

 declare var $: any;

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  examenes: Examen[] | any;
  examen: Examen | any;
  examenForm: FormGroup;
  submitted = false;
  modalTitle: String;

  constructor(private examenService: ExamenService, private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.examenForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      tipo_examen: ['', Validators.required],
      fecha: ['', Validators.required],
      costo: ['', Validators.required],
      horario: ['', Validators.required],
      enlace_facebook: ['', Validators.required],
      solicitud_examen: ['']
    });
    //Consulte la lista de examenes
    this.getExamenes();
  }

  // Consultar lista de examenes
  getExamenes(){
    this.examenes = [new Examen(1,"Examen","Promoción de grado", "2020-12-01",123,"12:00PM","http://localhost:4200/examen","solicutud")];
    this.examenService.getExamenes().subscribe(
      res => {
        this.examenes = res;
        console.log(this.examenes)
      },
      err => console.error(err)
    )
  }
  
  // Consultar un examen
  getExamen(id){
    this.examenes = null;
    this.examenService.getExamen(id).subscribe(
      res => {
        this.examen = res;
      },
      err => console.error(err)
    )
  }

  //Eliminar un examen
  deleteExamen(id){
    Swal.fire({
      title: 'Eliminar Examen',
      text: '¿Estás seguro que deseas eliminar al alumno?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'No eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.examenService.deleteExamen(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'El examen ha sido eliminado',
              'success'
            )
            $("#examenModal").modal("hide");
            this.getExamenes();
          },
          err => console.error(err)
        )
      }
    });
  }

  //Crear un alumno
  onSubmit(){
    this.submitted = true;

    if(this.examenForm.invalid){
      console.log("Formulario inválido");
      return;
    }

    if(this.modalTitle == "Registrar"){
      this.examenService.createExamen(this.examenForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El examen ha sido registrado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#examenModal").modal("hide");
          this.getExamenes();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.examenForm.value);
      this.examenService.updateExamen(this.examenForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El examen ha sido actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#examenModal").modal("hide");
          this.getExamenes();
          this.submitted = false;
        },
        err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al conectar con el seervidor'
          })
        }
      )
    }
  }

  updateExamen(examen: Examen){
    this.submitted = true;

    this.examenForm.controls['id'].setValue(examen.id);
    this.examenForm.controls['nombre'].setValue(examen.nombre);
    this.examenForm.controls['tipo_examen'].setValue(examen.tipo_examen);
    this.examenForm.controls['fecha'].setValue(examen.fecha);
    this.examenForm.controls['costo'].setValue(examen.costo);
    this.examenForm.controls['horario'].setValue(examen.horario);
    this.examenForm.controls['enlace_facebook'].setValue(examen.enlace_facebook);
    this.examenForm.controls['solicitud_examen'].setValue(examen.solicitud_examen);

    this.modalTitle = "Actualizar";
    $("#examenModal").modal("show");
  }

  //Convertir un archivo pdf a base 64
  convertFile(event){
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
        form.controls['solicitud_examen'].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function(error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0], this.examenForm);
  }

  showPDF(pdf_base64){
    const linkSource = pdf_base64;
    const downloadLink = document.createElement("a");
    const fileName = "solicitud_examen.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    return downloadLink;
  }

  tipoExamen = [
    'Promoción de grado',
    'Cambio de cinta',
    'Revisión',
    'Teórico'
  ]

  get f() { return this.examenForm.controls; }

  openModalExamen(){
    this.examenForm.reset();
    this.modalTitle = "Registrar";
    $("#examenModal").modal("show");
  }
}

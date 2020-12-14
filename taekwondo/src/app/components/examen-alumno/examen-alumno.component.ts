import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from 'src/app/_models/alumno';
import { AlumnoService } from 'src/app/_services/alumno.service';
import Swal from 'sweetalert2';
import { Examen } from 'src/app/_models/examen';
import { ExamenService } from 'src/app/_services/examen.service';


@Component({
  selector: 'app-examen-alumno',
  templateUrl: './examen-alumno.component.html',
  styleUrls: ['./examen-alumno.component.css']
})
export class ExamenAlumnoComponent implements OnInit {

  datos: Alumno;
  principal: Examen;
  examenes: Examen[] | any;
  submitted = false;
  modalTitle: String;
  examenForm: FormGroup;
  
  constructor(private examenService: ExamenService) { }
  
  ngOnInit(): void {
    this.getExamenes()
  }

  getExamenes(){
    //this.examenes = [];//[new Examen(1,"Examen","Promoción de grado", "2020-12-01",123,"12:00PM","http://localhost:4200/examen","solicitud")];
    this.examenService.getExamenes().subscribe(
      res => {
        this.examenes = res;
        this.principal = this.examenes.pop();  //elimina el primer elemento del arreglo y lo devuleve
        console.log(this.examenes)
      },
      err => console.error(err)
    )
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
    const fileName = "solicitudExamen.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    return downloadLink;
  }

}

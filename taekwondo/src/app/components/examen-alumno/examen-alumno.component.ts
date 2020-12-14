import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/_models/alumno';
import { AlumnoService } from 'src/app/_services/alumno.service';

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

}

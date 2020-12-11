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
  examenes: Examen[];
  submitted = false;
  modalTitle: String;
  
  constructor() { }
  
  ngOnInit(): void {
  }

}

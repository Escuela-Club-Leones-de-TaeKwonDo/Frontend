import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/_models/alumno';

@Component({
  selector: 'app-examen-alumno',
  templateUrl: './examen-alumno.component.html',
  styleUrls: ['./examen-alumno.component.css']
})
export class ExamenAlumnoComponent implements OnInit {

  constructor() { }
  datos: Alumno;
  ngOnInit(): void {
  }

}

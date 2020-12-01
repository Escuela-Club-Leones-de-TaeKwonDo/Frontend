import { Time } from '@angular/common';

export class Examen{
    id: number;
    nombre: String;
    tipo_examen: String;
    fecha: Date;
    costo: number;
    horario: Time;
    enlace_facebook: String;
    solicitud_examen: String;

    constructor(id, nombre, tipo_examen, fecha, costo, horario, enlace_facebook, solicitud_examen){
        this.id = id;
        this.nombre = nombre;
        this.tipo_examen = tipo_examen;
        this.fecha = fecha;
        this.costo = costo;
        this.horario = horario;
        this.enlace_facebook = enlace_facebook;
        this.solicitud_examen = solicitud_examen;
    }
}
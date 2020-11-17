import { Alumno } from './alumno';

export interface Examen{
    id_examen: number;
    nombre: String;
    tipo_examen: String;
    fecha: Date;
    costo: number;
    horario: Date;
    enlace_facebook: String;
    lista_alumnos: Alumno [];
    solicitud_examen: String;
}
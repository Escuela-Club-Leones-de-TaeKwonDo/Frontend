export class Evento {
    id_evento: number;
    nombre: String;
    id_tipo_evento: number;
    descripcion: String;
    fecha_inicio: Date;
    fecha_fin: Date;
    costo: number;
    enlace_facebook: String;

    constructor (id_evento, nombre, id_tipo_evento, descripcion, fecha_inicio, fecha_fin, costo, enlace_facebook ) {
                this.id_evento = id_evento;
                this.nombre = nombre;
                this.id_tipo_evento = id_tipo_evento;
                this.descripcion = descripcion;
                this.fecha_inicio = fecha_inicio;
                this.fecha_fin = fecha_fin;
                this.costo = costo;
                this.enlace_facebook = enlace_facebook;

    }
}
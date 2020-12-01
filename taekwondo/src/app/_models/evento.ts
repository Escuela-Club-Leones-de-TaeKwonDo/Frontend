export class Evento {
    id: number;
    nombre: String;
    descripcion: String;
    id_tipo_evento: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    costo: number;
    enlace_facebook: String;

    constructor(id, nombre, descripcion, id_tipo_evento, fecha_inicio, fecha_fin, costo, enlace_facebook){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.id_tipo_evento = id_tipo_evento;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.costo = costo;
        this.enlace_facebook = enlace_facebook;
    }
}